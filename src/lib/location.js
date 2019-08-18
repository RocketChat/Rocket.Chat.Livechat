/* eslint-disable no-lonely-if */
/* eslint-disable no-alert */
import { getToken } from './main';
import { Livechat } from '../api';
import store from '../store';

const docActivityEvents = ['mousemove', 'mousedown', 'touchend', 'keydown'];
const token = getToken();
let timer;
let initiated = false;
const awayTime = 300000;
let self;
let oldStatus;


export const userSessionPresence = {

	init() {
		if (initiated) {
			return;
		}

		initiated = true;
		self = this;
		store.on('change', this.handleStoreChange);
	},

	reset() {
		initiated = false;
		this.stopEvents();
		store.off('change', this.handleStoreChange);
	},

	stopTimer() {
		timer && clearTimeout(timer);
	},

	startTimer() {
		this.stopTimer();
		timer = setTimeout(this.setAway, awayTime);
	},

	handleStoreChange(state) {
		if (!initiated) {
			return;
		}

		const { token } = state;
		token ? self.startEvents() : self.stopEvents();
	},

	startEvents() {
		docActivityEvents.forEach((event) => {
			document.addEventListener(event, this.setOnline);
		});

		window.addEventListener('focus', this.setOnline);
	},

	stopEvents() {
		docActivityEvents.forEach((event) => {
			document.removeEventListener(event, this.setOnline);
		});

		window.removeEventListener('focus', this.setOnline);
		this.stopTimer();
	},

	async setOnline() {
		self.startTimer();
		if (oldStatus === 'online') {
			return;
		}
		oldStatus = 'online';

		await Livechat.updateSessionStatus('online', token);
	},

	async setAway() {
		self.stopTimer();
		if (oldStatus === 'away') {
			return;
		}
		oldStatus = 'away';
		await Livechat.updateSessionStatus('away', token);
	},
};

const deviceInfo = () => {
	const module = {
		options: [],
		header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
		dataos: [
			{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
			{ name: 'Windows', value: 'Win', version: 'NT' },
			{ name: 'iPhone', value: 'iPhone', version: 'OS' },
			{ name: 'iPad', value: 'iPad', version: 'OS' },
			{ name: 'Kindle', value: 'Silk', version: 'Silk' },
			{ name: 'Android', value: 'Android', version: 'Android' },
			{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
			{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
			{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
			{ name: 'Linux', value: 'Linux', version: 'rv' },
			{ name: 'Palm', value: 'Palm', version: 'PalmOS' },
		],
		databrowser: [
			{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
			{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
			{ name: 'Safari', value: 'Safari', version: 'Version' },
			{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
			{ name: 'Opera', value: 'Opera', version: 'Opera' },
			{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
			{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
		],
		init() {
			const agent = this.header.join(' ');
			const os = this.matchItem(agent, this.dataos);
			const browser = this.matchItem(agent, this.databrowser);

			return { os, browser };
		},
		matchItem(string, data) {
			let i = 0;
			let j = 0;
			let regex;
			let regexv;
			let match;
			let matches;
			let version;

			for (i = 0; i < data.length; i += 1) {
				regex = new RegExp(data[i].value, 'i');
				match = regex.test(string);
				if (match) {
					regexv = new RegExp(`${ data[i].version }[- /:;]([\\d._]+)`, 'i');
					matches = string.match(regexv);
					version = '';
					if (matches) { if (matches[1]) { matches = matches[1]; } }
					if (matches) {
						matches = matches.split(/[._]+/);
						for (j = 0; j < matches.length; j += 1) {
							if (j === 0) {
								version += `${ matches[j] }.`;
							} else {
								version += matches[j];
							}
						}
					} else {
						version = '0';
					}
					return {
						name: data[i].name,
						version: parseFloat(version),
					};
				}
			}
			return { name: 'unknown', version: 0 };
		},
	};

	const info = module.init();
	return {
		os: info.os.name,
		osVersion: info.os.version,
		browserName: info.browser.name,
		browserVersion: info.browser.version,
	};
};

/**
 * This is used to convert location to a default type we want to send to server
 * @param {Object} location
 * @returns {Object}
 */
const convertLocationToSend = (location) => (
	{
		countryName: location.country || location.country_name,
		countryCode: location.country_code,
		city: location.city || location.state,
		latitude: location.latitude,
		longitude: location.longitude,
		completLocation: `${ location.country }, ${ location.state }, ${ location.city }`,
	});

/**
 * This is used to get location details for user
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Object}
 */
const locationPrimary = async (latitude, longitude) => {
	const { address } = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ latitude }&lon=${ longitude }`, {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}).then((res) => res.json());

	const location = convertLocationToSend(address);
	location.latitude = latitude;
	location.longitude = longitude;

	return {
		location,
		token,
		deviceInfo: deviceInfo(),
	};
};

/**
 * This is backup method to get location of user
 * @returns {Object}
 */
const locationBackup = async () => {
	const location = await fetch('https://api.ipdata.co?api-key=test', {
		headers: {
			Accept: 'application/json',
		},
	}).then((res) => res.json());

	return {
		location: convertLocationToSend(location),
		token,
		deviceInfo: deviceInfo(),
	};
};

/**
 * This function works in following way
 * 1. Check user location already present or not
 * 2. If not, asks for user location access
 * 3. If not granted, sets locationAccess in store as false, so that we ask for access again, before starting chat
 * 4. If granted, sets location of user info to DB
 * 5. If location already present, increases the visit count for user
 */
export const locationUpdate = async () => {
	const checkLocationUser = await Livechat.checkLocationUser(token);
	// check user location all ready there or not
	if (checkLocationUser && !checkLocationUser._id) {
		// Ask for permission for location
		if (navigator.geolocation) {
			store.setState({
				locationAccess: true,
			});
			navigator.geolocation.getCurrentPosition(async (position) => {
				const locationUser = await locationPrimary(position.coords.latitude, position.coords.longitude);
				await Livechat.sendLocationData(locationUser);
				userSessionPresence.init();
			}, (err) => {
				// This means user has denied location access
				// We need then to confirm location before starting the chat
				// Save state of location access inside store.
				if (err) {
					store.setState({
						locationAccess: false,
					});
				}
			});
		} else {
			// It means navigator is not supported in the browser, so ask
			// for location access by backup API.
			if (confirm('Please allow to access your location, for better assistance')) {
				store.setState({
					locationAccess: true,
				});
				const locationUser = await locationBackup();
				await Livechat.sendLocationData(locationUser);
				userSessionPresence.init();
			}
		}
	} else {
		// Update visit count for user
		Livechat.updateVisitCount(token);
	}
};

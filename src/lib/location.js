/* eslint-disable no-lonely-if */
/* eslint-disable no-alert */
import { getToken } from './main';
import { Livechat } from '../api';
import store from '../store';

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
	});

/**
 * This is used to get location details for user
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Object}
 */
const locationPrimary = async(latitude, longitude) => {
	const { address } = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ latitude }&lon=${ longitude }`, {
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}).then((res) => (res.json()));

	const location = convertLocationToSend(address);
	location.latitude = latitude;
	location.longitude = longitude;

	const token = getToken();
	return {
		location,
		token,
	};
};

/**
 * This is backup method to get location of user
 * @returns {Object}
 */
const locationBackup = async() => {
	const location = await fetch('https://api.ipdata.co?api-key=test', {
		headers: {
			Accept: 'application/json',
		},
	}).then((res) => (res.json()));
  
	const token = getToken();
	return {
		location: convertLocationToSend(location),
		token,
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
export const locationUpdate = async() => {
	const checkLocationUser = await Livechat.checkLocationUser(getToken());
	// check user location all ready there or not
	if (checkLocationUser && !checkLocationUser._id) {
		// Ask for permission for location
		if (navigator.geolocation) {
			store.setState({
				locationAccess: true,
				userState: 'idle',
			});
			navigator.geolocation.getCurrentPosition(async(position) => {
				const locationUser = await locationPrimary(position.coords.latitude, position.coords.longitude);
				await Livechat.sendLocationData(locationUser);
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
					userState: 'idle',
				});
				const locationUser = await locationBackup();
				await Livechat.sendLocationData(locationUser);
			}
		}
	} else {
		// Update visit count for user
		Livechat.updateVisitCount(getToken());
	}
};

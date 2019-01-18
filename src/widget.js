import EventEmitter from 'wolfy87-eventemitter';


const log = process.env.NODE_ENV === 'development' ?
	(...args) => console.log('%cwidget%c', 'color: red', 'color: initial', ...args) :
	() => {};


const WIDGET_OPEN_WIDTH = 365;
const WIDGET_OPEN_HEIGHT = 510;
const WIDGET_MINIMIZED_WIDTH = 54;
const WIDGET_MINIMIZED_HEIGHT = 54;
const WIDGET_MARGIN = 16;


window.RocketChat = window.RocketChat || { _: [] };
const config = {};
let widget;
let iframe;
let hookQueue = [];
let ready = false;
let smallScreen = false;
let bodyStyle;
let scrollPosition;

const widgetWidth = `${ WIDGET_MARGIN + WIDGET_OPEN_WIDTH + WIDGET_MARGIN }px`;
const widgetHeightOpened = `${ WIDGET_MARGIN + WIDGET_OPEN_HEIGHT + WIDGET_MARGIN }px`;
const widgetHeightClosed = `${ WIDGET_MARGIN + WIDGET_MINIMIZED_HEIGHT + WIDGET_MARGIN }px`;

const validCallbacks = [
	'chat-maximized',
	'chat-minimized',
	'chat-started',
	'chat-ended',
	'pre-chat-form-submit',
	'offline-form-submit',
];

const callbacks = new EventEmitter();

function registerCallback(eventName, fn) {
	if (validCallbacks.indexOf(eventName) === -1) {
		return false;
	}

	return callbacks.on(eventName, fn);
}

function emitCallback(eventName, data) {
	if (typeof data !== 'undefined') {
		callbacks.emit(eventName, data);
	} else {
		callbacks.emit(eventName);
	}
}

// hooks
function callHook(action, params) {
	if (!ready) {
		return hookQueue.push([action, params]);
	}
	const data = {
		src: 'rocketchat',
		fn: action,
		args: params,
	};
	iframe.contentWindow.postMessage(data, '*');
}

function closeWidget() {
	if (widget.dataset.state === 'closed') {
		return;
	}

	if (smallScreen) {
		document.body.style.cssText = bodyStyle;
		document.body.scrollTop = scrollPosition;
	}

	widget.dataset.state = 'closed';
	widget.style.height = widgetHeightClosed;
	widget.style.right = '0';
	widget.style.bottom = '0';
	callHook('widgetClosed');

	emitCallback('chat-minimized');
}

function openWidget() {
	if (widget.dataset.state === 'opened') {
		return;
	}

	if (smallScreen) {
		scrollPosition = document.body.scrollTop;
		bodyStyle = document.body.style.cssText;
		document.body.style.cssText += `overflow: hidden; height: 100%; width: 100%; position: fixed; top:${ scrollPosition }px;`;
	}

	widget.dataset.state = 'opened';
	widget.style.height = widgetHeightOpened;
	callHook('widgetOpened');
	document.querySelector('.rocketchat-widget iframe').focus();

	emitCallback('chat-maximized');
}

const api = {
	popup: null,

	ready() {
		ready = true;
		if (hookQueue.length > 0) {
			hookQueue.forEach(function(hookParams) {
				callHook.apply(this, hookParams);
			});
			hookQueue = [];
		}
	},

	minimizeWindow() {
		closeWidget();
	},

	restoreWindow() {
		if (api.popup && api.popup.closed !== true) {
			api.popup.close();
			api.popup = null;
		}
		openWidget();
	},

	toggleWindow() {
		if (widget.dataset.state === 'closed') {
			openWidget();
		} else {
			closeWidget();
		}
	},

	openPopout() {
		closeWidget();
		api.popup = window.open(`${ config.url }?mode=popout`, 'livechat-popout',
			`width=${ WIDGET_OPEN_WIDTH }, height=${ WIDGET_OPEN_HEIGHT }, toolbars=no`);
		api.popup.focus();
	},

	openWidget() {
		openWidget();
	},

	removeWidget() {
		document.body.removeChild(widget);
	},

	callback(eventName, data) {
		emitCallback(eventName, data);
	},
};

function pageVisited(change) {
	callHook('pageVisited', {
		change,
		location: JSON.parse(JSON.stringify(document.location)),
		title: document.title,
	});
}

function setCustomField(key, value, overwrite) {
	if (typeof overwrite === 'undefined') {
		overwrite = true;
	}
	callHook('setCustomField', [key, value, overwrite]);
}

function setTheme(theme) {
	callHook('setTheme', theme);
}

function setDepartment(department) {
	callHook('setDepartment', department);
}

function setGuestToken(token) {
	callHook('setGuestToken', token);
}

function setGuestName(name) {
	callHook('setGuestName', name);
}

function setGuestEmail(email) {
	callHook('setGuestEmail', email);
}

function registerGuest(guest) {
	callHook('registerGuest', guest);
}

function clearDepartment() {
	callHook('clearDepartment');
}

const currentPage = {
	href: null,
	title: null,
};

function trackNavigation() {
	setInterval(() => {
		if (document.location.href !== currentPage.href) {
			pageVisited('url');
			currentPage.href = document.location.href;
		}
		if (document.title !== currentPage.title) {
			pageVisited('title');
			currentPage.title = document.title;
		}
	}, 800);
}

function init(url) {
	if (!url) {
		return;
	}

	config.url = url;

	const chatWidget = document.createElement('div');
	chatWidget.dataset.state = 'closed';
	chatWidget.className = 'rocketchat-widget';
	chatWidget.innerHTML = `${ '<div class="rocketchat-container" style="width:100%;height:100%">' +
		'<iframe id="rocketchat-iframe" src="' }${ url }" style="width:100%;height:100%;border:none;background-color:transparent" allowTransparency="true"></iframe> ` +
		'</div><div class="rocketchat-overlay"></div>';

	chatWidget.style.position = 'fixed';
	chatWidget.style.width = widgetWidth;
	chatWidget.style.height = widgetHeightClosed;
	chatWidget.style.borderTopLeftRadius = '5px';
	chatWidget.style.borderTopRightRadius = '5px';
	chatWidget.style.bottom = '0';
	chatWidget.style.right = '0';
	chatWidget.style.zIndex = '12345';

	document.body.appendChild(chatWidget);

	widget = document.querySelector('.rocketchat-widget');
	iframe = document.getElementById('rocketchat-iframe');

	window.addEventListener('message', (msg) => {
		if (typeof msg.data === 'object' && msg.data.src !== undefined && msg.data.src === 'rocketchat') {
			if (api[msg.data.fn] !== undefined && typeof api[msg.data.fn] === 'function') {
				const args = [].concat(msg.data.args || []);
				log(msg.data.fn, ...args);
				api[msg.data.fn].apply(null, args);
			}
		}
	}, false);

	function mediaqueryresponse(mql) {
		if (mql.matches) {
			smallScreen = true;
			chatWidget.style.left = '0';
			chatWidget.style.right = '0';
			chatWidget.style.width = '100%';
		} else {
			chatWidget.style.left = 'auto';
			chatWidget.style.right = '0';
			chatWidget.style.width = widgetWidth;
		}
	}

	const mql = window.matchMedia('screen and (max-device-width: 480px)');
	mediaqueryresponse(mql);
	mql.addListener(mediaqueryresponse);

	// track user navigation
	trackNavigation();
}

if (typeof window.initRocket !== 'undefined') {
	console.warn('initRocket is now deprecated. Please update the livechat code.');
	init(window.initRocket[0]);
}

if (typeof window.RocketChat.url !== 'undefined') {
	init(window.RocketChat.url);
}

const queue = window.RocketChat._;

window.RocketChat = window.RocketChat._.push = function(c) {
	c.call(window.RocketChat.livechat);
};

// exports
window.RocketChat.livechat = {
	// methods
	pageVisited,
	setCustomField,
	setTheme,
	setDepartment,
	clearDepartment,
	setGuestToken,
	setGuestName,
	setGuestEmail,
	registerGuest,

	// callbacks
	onChatMaximized(fn) { registerCallback('chat-maximized', fn); },
	onChatMinimized(fn) { registerCallback('chat-minimized', fn); },
	onChatStarted(fn) { registerCallback('chat-started', fn); },
	onChatEnded(fn) { registerCallback('chat-ended', fn); },
	onPrechatFormSubmit(fn) { registerCallback('pre-chat-form-submit', fn); },
	onOfflineFormSubmit(fn) { registerCallback('offline-form-submit', fn); },
};

// proccess queue
queue.forEach((c) => {
	c.call(window.RocketChat.livechat);
});

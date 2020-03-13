import EventEmitter from 'wolfy87-eventemitter';


const log = process.env.NODE_ENV === 'development'
	? (...args) => window.console.log('%cwidget%c', 'color: red', 'color: initial', ...args)
	: () => {};


const WIDGET_OPEN_WIDTH = 365;
const WIDGET_OPEN_HEIGHT = 525;
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

export const validCallbacks = [
	'chat-maximized',
	'chat-minimized',
	'chat-started',
	'chat-ended',
	'pre-chat-form-submit',
	'offline-form-submit',
	'show-widget',
	'hide-widget',
	'assign-agent',
	'agent-status-change',
	'queue-position-change',
	'no-agent-online',
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

const updateWidgetStyle = (isOpened) => {
	if (smallScreen && isOpened) {
		scrollPosition = document.documentElement.scrollTop;
		bodyStyle = document.body.style.cssText;
		document.body.style.cssText += `overflow: hidden; height: 100%; width: 100%; position: fixed; top: ${ scrollPosition }px;`;
	} else {
		document.body.style.cssText = bodyStyle;
		if (smallScreen) {
			document.documentElement.scrollTop = scrollPosition;
		}
	}

	if (isOpened) {
		widget.style.left = smallScreen ? '0' : 'auto';

		/**
		 * If we use widget.style.height = smallScreen ? '100vh' : ...
		 * In above case some browser's viewport height is not rendered correctly
		 * so, as 100vh will resolve to 100% of the current viewport height,
		 * so fixed it to 100% avoiding problem for some browsers. Similar resolution
		 * for widget.style.width
		 */

		widget.style.width = smallScreen ? '100%' : `${ WIDGET_MARGIN + WIDGET_OPEN_WIDTH + WIDGET_MARGIN }px`;
		widget.style.height = smallScreen ? '100%'
			: `${ WIDGET_MARGIN + WIDGET_OPEN_HEIGHT + WIDGET_MARGIN + WIDGET_MINIMIZED_HEIGHT + WIDGET_MARGIN }px`;
	} else {
		widget.style.left = 'auto';
		widget.style.width = `${ WIDGET_MARGIN + WIDGET_MINIMIZED_WIDTH + WIDGET_MARGIN }px`;
		widget.style.height = `${ WIDGET_MARGIN + WIDGET_MINIMIZED_HEIGHT + WIDGET_MARGIN }px`;
	}
};

const createWidget = (url) => {
	widget = document.createElement('div');
	widget.className = 'rocketchat-widget';
	widget.style.position = 'fixed';
	widget.style.width = `${ WIDGET_MARGIN + WIDGET_MINIMIZED_WIDTH + WIDGET_MARGIN }px`;
	widget.style.height = `${ WIDGET_MARGIN + WIDGET_MINIMIZED_HEIGHT + WIDGET_MARGIN }px`;
	widget.style.maxHeight = '100vh';
	widget.style.bottom = '0';
	widget.style.right = '0';
	widget.style.zIndex = '12345';
	widget.dataset.state = 'closed';

	const container = document.createElement('div');
	container.className = 'rocketchat-container';
	container.style.width = '100%';
	container.style.height = '100%';

	iframe = document.createElement('iframe');
	iframe.id = 'rocketchat-iframe';
	iframe.allowTransparency = 'true';
	iframe.src = url;
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';
	iframe.style.backgroundColor = 'transparent';

	container.appendChild(iframe);
	widget.appendChild(container);
	document.body.appendChild(widget);

	const handleMediaQueryTest = ({ matches }) => {
		if (!widget) {
			return;
		}

		smallScreen = matches;
		updateWidgetStyle(widget.dataset.state === 'opened');
		callHook('setExpanded', smallScreen);
	};

	const mediaQueryList = window.matchMedia('screen and (max-device-width: 480px)');
	mediaQueryList.addListener(handleMediaQueryTest);
	handleMediaQueryTest(mediaQueryList);
};

const openWidget = () => {
	if (widget.dataset.state === 'opened') {
		return;
	}

	updateWidgetStyle(true);
	widget.dataset.state = 'opened';
	iframe.focus();
	emitCallback('chat-maximized');
};

function closeWidget() {
	if (widget.dataset.state === 'closed') {
		return;
	}

	updateWidgetStyle(false);
	widget.dataset.state = 'closed';
	emitCallback('chat-minimized');
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

	openPopout() {
		closeWidget();
		api.popup = window.open(`${ config.url }${ config.url.lastIndexOf('?') > -1 ? '&' : '?' }mode=popout`,
			'livechat-popout', `width=${ WIDGET_OPEN_WIDTH }, height=${ WIDGET_OPEN_HEIGHT }, toolbars=no`);
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

	showWidget() {
		iframe.style.display = 'initial';
		emitCallback('show-widget');
	},

	hideWidget() {
		iframe.style.display = 'none';
		emitCallback('hide-widget');
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

function setLanguage(language) {
	callHook('setLanguage', language);
}

function showWidget() {
	callHook('showWidget');
}

function hideWidget() {
	callHook('hideWidget');
}

function maximizeWidget() {
	callHook('maximizeWidget');
}

function minimizeWidget() {
	callHook('minimizeWidget');
}

const currentPage = {
	href: null,
	title: null,
};

const attachMessageListener = () => {
	window.addEventListener('message', (msg) => {
		if (typeof msg.data === 'object' && msg.data.src !== undefined && msg.data.src === 'rocketchat') {
			if (api[msg.data.fn] !== undefined && typeof api[msg.data.fn] === 'function') {
				const args = [].concat(msg.data.args || []);
				log(`api.${ msg.data.fn }`, ...args);
				api[msg.data.fn].apply(null, args);
			}
		}
	}, false);
};

const trackNavigation = () => {
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
};

const init = (url) => {
	if (!url) {
		return;
	}

	config.url = url;

	createWidget(url);
	attachMessageListener();
	trackNavigation();
};

if (typeof window.initRocket !== 'undefined') {
	console.warn('initRocket is now deprecated. Please update the livechat code.');
	init(window.initRocket[0]);
}

if (typeof window.RocketChat.url !== 'undefined') {
	init(window.RocketChat.url);
}

const queue = window.RocketChat._;

window.RocketChat._.push = function(c) {
	c.call(window.RocketChat.livechat);
};
window.RocketChat = window.RocketChat._.push;

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
	setLanguage,
	showWidget,
	hideWidget,
	maximizeWidget,
	minimizeWidget,

	// callbacks
	onChatMaximized(fn) { registerCallback('chat-maximized', fn); },
	onChatMinimized(fn) { registerCallback('chat-minimized', fn); },
	onChatStarted(fn) { registerCallback('chat-started', fn); },
	onChatEnded(fn) { registerCallback('chat-ended', fn); },
	onPrechatFormSubmit(fn) { registerCallback('pre-chat-form-submit', fn); },
	onOfflineFormSubmit(fn) { registerCallback('offline-form-submit', fn); },
	onWidgetShown(fn) { registerCallback('show-widget', fn); },
	onWidgetHidden(fn) { registerCallback('hide-widget', fn); },
	onAssignAgent(fn) { registerCallback('assign-agent', fn); },
	onAgentStatusChange(fn) { registerCallback('agent-status-change', fn); },
	onQueuePositionChange(fn) { registerCallback('queue-position-change', fn); },
	onServiceOffline(fn) { registerCallback('no-agent-online', fn); },
};

// proccess queue
queue.forEach((c) => {
	c.call(window.RocketChat.livechat);
});

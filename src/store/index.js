import { h, Component, createContext } from 'preact';

import Store from './Store';

const createToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const initialState = {
	token: createToken(),
	typing: [],
	config: {
		messages: {},
		settings: {},
		theme: {},
		triggers: [],
		departments: [],
		resources: {},
	},
	messages: [],
	user: null,
	sound: {
		src: '',
		enabled: true,
		play: false,
	},
	iframe: {
		guest: {},
		theme: {},
		visible: true,
	},
	gdpr: {
		accepted: false,
	},
	alerts: [],
	visible: true,
	minimized: true,
	unread: null,
};

const dontPersist = ['messages', 'typing', 'loading', 'alerts', 'unread', 'noMoreMessages', 'modal'];
export const store = new Store(initialState, { dontPersist });

if (process.env.NODE_ENV === 'development') {
	store.on('change', ([, , partialState]) => {
		// eslint-disable-next-line no-console
		console.log('%cstore.setState %c%o', 'color: blue', 'color: initial', partialState);
	});
}


const StoreContext = createContext();

export class Provider extends Component {
	static displayName = 'StoreProvider'

	state = { ...store.state, dispatch: store.setState.bind(store) }

	handleStoreChange = () => {
		this.setState({ ...store.state });
	}

	componentDidMount() {
		store.on('change', this.handleStoreChange);
	}

	componentWillUnmount() {
		store.off('change', this.handleStoreChange);
	}

	render = ({ children }) => (
		<StoreContext.Provider value={this.state}>
			{children}
		</StoreContext.Provider>
	)
}

export const { Consumer } = StoreContext;

export default store;

import { h, Component, createRef } from 'preact';

import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import { parentCall } from '../../lib/parentCall';
import styles from './styles.scss';


const defaultTitle = I18n.t('Messages');

export default class TriggerMessage extends Component {
	state = { }

	constructor(props) {
		super(props);
		this.ref = createRef();
	}

	componentDidUpdate() {
		let height = 0;

		this.ref.current.base.children.forEach((el) => {
			height += el.scrollHeight;
		});

		parentCall('resizeWidget', height);
	}

	render({ title, messages, loading, onStartChat = () => {}, departments, ...props }) {
		const { theme: { color } } = props;
		return (
			<Screen
				title={title || defaultTitle}
				{...props}
				triggered={true}
				ref={this.ref}
			>
				<Screen.Content triggered={true}>
					{messages && messages.map((message) => message.msg && <p className={createClassName(styles, 'trigger-message__message')}>{message.msg}</p>)}
				</Screen.Content>
				<footer className={createClassName(styles, 'trigger-message__footer')}>
					<hr className={createClassName(styles, 'trigger-message__separator')} />
					<button style={color && { color }} onClick={onStartChat} className={createClassName(styles, 'trigger-message__link-reply')}>{I18n.t('Start chat')}</button>
				</footer>
			</Screen>
		);
	}
}

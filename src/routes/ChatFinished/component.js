import { Component } from 'preact';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';

export default class ChatFinished extends Component {
	handleClick = () => {
		const { onRedirectChat } = this.props;
		onRedirectChat && onRedirectChat();
	}

	render = ({
		color,
		title,
		greeting,
		message,
		// eslint-disable-next-line no-unused-vars
		onRedirectChat,
		...props
	}) => (
		<Screen
			color={color}
			title={title}
			className={createClassName(styles, 'chat-finished')}
			{...props}
		>
			<p className={createClassName(styles, 'chat-finished__greeting')}>{greeting}</p>
			<p className={createClassName(styles, 'chat-finished__message')}>{message}</p>

			<Form>
				<Form.Item>
					<Button onClick={this.handleClick} stack>New Chat</Button>
				</Form.Item>
			</Form>
		</Screen>
	)
}

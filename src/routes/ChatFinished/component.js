import { Component } from 'preact';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Screen from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles';

export default class ChatFinished extends Component {

	render({ color, title, greeting, message, onRedirectChat, ...props }) {

		return (
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
						<Button onClick={onRedirectChat} stack>New Chat</Button>
					</Form.Item>
				</Form>
			</Screen>
		);
	}
}

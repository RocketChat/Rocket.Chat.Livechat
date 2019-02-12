import { Component } from 'preact';
import Composer, { Action, Actions } from '../../components/Composer';
import FilesDropTarget from '../../components/FilesDropTarget';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import Messages from '../../components/Messages';
import Screen from '../../components/Screen';
import { debounce, createClassName } from '../../components/helpers';
import styles from './styles';
import ChangeIcon from '../../icons/change.svg';
import FinishIcon from '../../icons/finish.svg';
import PlusIcon from '../../icons/plus.svg';
import RemoveIcon from '../../icons/remove.svg';
import SendIcon from '../../icons/send.svg';
import EmojiIcon from '../../icons/smile.svg';
import { FileUploadInput } from '../../components/Form/inputs';

const toBottom = (el) => el.scrollTop = el.scrollHeight;

export default class Chat extends Component {
	handleInputFileUploadRef = (ref) => {
		this.inputFileUploadRef = ref;
	}

	handleMessagesContainerRef = (messagesContainer) => {
		this.messagesContainer = messagesContainer;
	}

	handleScroll = debounce(() => {
		if (!this.messagesContainer) {
			// component was unmounted
			return;
		}

		const { clientHeight, scrollTop, scrollHeight } = this.messagesContainer;
		const atTop = scrollTop === 0;
		const atBottom = scrollHeight - scrollTop === clientHeight;

		if (this.state.atBottom !== atBottom) {
			this.setState({ atBottom });
		}

		const { onTop, onBottom } = this.props;

		if (atTop && onTop) {
			return onTop();
		}

		if (atBottom && onBottom) {
			return onBottom();
		}
	}, 100)

	state = {
		atBottom: true,
		text: '',
	}

	handleSendClick = (event) => {
		event.preventDefault();
		const { text } = this.state;
		this.handleSubmit(text);
	}

	handleSubmit = (text) => {
		if (this.props.onSubmit) {
			this.props.onSubmit(text);
			this.setState({ text: '' });
		}
	}

	handleUploadClick = (event) => {
		event.preventDefault();

		const { onUpload } = this.props;
		if (!onUpload) {
			return;
		}

		const { input } = this.inputFileUploadRef;
		input && input.click();
	}

	handleOnChangeFileUploadInput = () => {
		const files = [this.inputFileUploadRef.value];
		return this.props.onUpload && this.props.onUpload(files);
	}

	handleChangeText = (text) => {
		this.setState({ text });
		const { onChangeText } = this.props;
		onChangeText && onChangeText(text);
	}

	componentDidMount() {
		toBottom(this.messagesContainer);
	}

	componentDidUpdate() {
		if (this.state.atBottom) {
			toBottom(this.messagesContainer);
		}
	}

	render = ({
		color,
		title,
		fontColor,
		uid,
		agent,
		typingUsernames,
		avatarResolver,
		conversationFinishedMessage,
		loading,
		connecting,
		onUpload,
		messages,
		uploads = false,
		emoji = false,
		options,
		onChangeDepartment,
		onFinishChat,
		onRemoveUserData,
		lastReadMessageId,
		...props
	}, {
		atBottom = true,
		text,
	}) => (
		<Screen
			color={color}
			title={title || I18n.t('Need help?')}
			fontColor={fontColor}
			agent={agent ? {
				...agent,
				avatar: {
					description: agent.username,
					src: avatarResolver(agent.username),
				},
			} : null}
			nopadding
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
			className={createClassName(styles, 'chat')}
			{...props}
		>
			<FilesDropTarget overlayed overlayText={I18n.t('Drop here to upload a file')} onUpload={onUpload}>
				<Screen.Content nopadding>
					<FileUploadInput hidden ref={this.handleInputFileUploadRef} onChange={this.handleOnChangeFileUploadInput} />
					<div className={createClassName(styles, 'chat__messages', { atBottom, loading })}>
						<div
							ref={this.handleMessagesContainerRef}
							onScroll={this.handleScroll}
							className={createClassName(styles, 'chat__wrapper')}
						>
							<Messages
								avatarResolver={avatarResolver}
								uid={uid}
								messages={messages}
								typingUsernames={typingUsernames}
								conversationFinishedMessage={conversationFinishedMessage}
								lastReadMessageId={lastReadMessageId}
							/>
						</div>
					</div>
				</Screen.Content>
				<Screen.Footer
					options={options ? (
						<Footer.Options>
							<Menu.Group>
								{onChangeDepartment && (
									<Menu.Item onClick={onChangeDepartment} icon={ChangeIcon}>{I18n.t('Change department')}</Menu.Item>
								)}
								{onRemoveUserData && (
									<Menu.Item onClick={onRemoveUserData} icon={RemoveIcon}>{I18n.t('Forget/Remove my data')}</Menu.Item>
								)}
								{onFinishChat && (
									<Menu.Item danger onClick={onFinishChat} icon={FinishIcon}>{I18n.t('Finish this chat')}</Menu.Item>
								)}
							</Menu.Group>
						</Footer.Options>
					) : null}
				>
					<Composer onUpload={onUpload}
						onSubmit={this.handleSubmit}
						connecting={connecting}
						onChange={this.handleChangeText}
						placeholder={I18n.t('Type your message here')}
						value={text}
						pre={emoji && (
							<Actions>
								<Action>
									<EmojiIcon width={20} />
								</Action>
							</Actions>
						)}
						post={(
							<Actions>
								{text.length === 0 && uploads && (
									<Action onClick={this.handleUploadClick}>
										<PlusIcon width={20} />
									</Action>
								)}
								{text.length > 0 && (
									<Action onClick={this.handleSendClick}>
										<SendIcon width={20} />
									</Action>
								)}
							</Actions>
						)}
					/>
				</Screen.Footer>
			</FilesDropTarget>
		</Screen>
	)
}

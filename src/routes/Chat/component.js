import { Component } from 'preact';
import Composer, { Action, Actions } from '../../components/Composer';
import DropFiles from '../../components/DropFiles';
import Messages from '../../components/Messages';
import Screen from '../../components/Screen';
import Sound from '../../components/Sound';
import { debounce, createClassName } from '../../components/helpers';
import styles from './styles';
import EmojiIcon from '../../icons/smile.svg';
import PlusIcon from '../../icons/plus.svg';
import SendIcon from '../../icons/send.svg';
import { FileUploadInput } from '../../components/Form/inputs';

const toBottom = (el) => el.scrollTop = el.scrollHeight;


export default class Chat extends Component {
	handleSoundRef = (sound) => {
		this.sound = sound;
	}

	handleInputFileUploadRef = (ref) => {
		this.inputFileUploadRef = ref;
	}

	handleMessagesContainerRef = (messagesContainer) => {
		this.messagesContainer = messagesContainer;
	}

	handleInputRef = (ref) => {
		this.inputRef = ref;
	}

	handleScroll = debounce(() => {
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
	}

	handleSendClick = (event) => {
		event.preventDefault();

		if (this.props.onSubmit) {
			const { value: msg } = this.inputRef;
			this.props.onSubmit(msg);
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
		sound,
		user,
		agent,
		typingAvatars,
		conversationFinishedMessage,
		loading,
		connecting,
		onUpload,
		onPlaySound,
		onChangeText,
		onSubmit,
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
	}) => (
		<Screen
			color={color}
			title={title || I18n.t('Need help?')}
			agent={agent}
			nopadding
			options={options}
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
			footer={(
				<Composer onUpload={onUpload}
					onSubmit={onSubmit}
					connecting={connecting}
					onChange={onChangeText}
					placeholder={I18n.t('Type your message here')}
					ref={this.handleInputRef}
					pre={emoji && (
						<Actions>
							<Action>
								<EmojiIcon width={20} />
							</Action>
						</Actions>
					)}
					post={(
						<Actions>
							{uploads && (
								<Action onClick={this.handleUploadClick}>
									<PlusIcon width={20} />
								</Action>
							)}
							<Action onClick={this.handleSendClick}>
								<SendIcon width={20} />
							</Action>
						</Actions>
					)}
				/>
			)}
			className={createClassName(styles, 'chat')}
			{...props}
		>
			<Sound ref={this.handleSoundRef} onPlay={onPlaySound} src={sound.src} play={sound.play} />
			<FileUploadInput hidden ref={this.handleInputFileUploadRef} onChange={this.handleOnChangeFileUploadInput} />
			<DropFiles onUpload={onUpload}>
				<div className={createClassName(styles, 'chat__messages', { atBottom, loading })}>
					<div
						ref={this.handleMessagesContainerRef}
						onScroll={this.handleScroll}
						className={createClassName(styles, 'chat__wrapper')}
					>
						<Messages
							user={user}
							agent={agent}
							messages={messages}
							typingAvatars={typingAvatars}
							conversationFinishedMessage={conversationFinishedMessage}
							lastReadMessageId={lastReadMessageId}
						/>
					</div>
				</div>
			</DropFiles>
		</Screen>
	)
}

import { Picker } from 'emoji-mart';
import { h, Component } from 'preact';

import { Button } from '../../components/Button';
import { CallIframe } from '../../components/Calls/CallIFrame';
import { CallNotification } from '../../components/Calls/CallNotification';
import { CallStatus } from '../../components/Calls/CallStatus';
import { Composer, ComposerAction, ComposerActions } from '../../components/Composer';
import { FilesDropTarget } from '../../components/FilesDropTarget';
import { FooterOptions, CharCounter } from '../../components/Footer';
import { Menu } from '../../components/Menu';
import { MessageList } from '../../components/Messages';
import { Screen } from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import I18n from '../../i18n';
import ChangeIcon from '../../icons/change.svg';
import FinishIcon from '../../icons/finish.svg';
import PlusIcon from '../../icons/plus.svg';
import RemoveIcon from '../../icons/remove.svg';
import SendIcon from '../../icons/send.svg';
import EmojiIcon from '../../icons/smile.svg';
import styles from './styles.scss';

export default class Chat extends Component {
	state = {
		atBottom: true,
		text: '',
		emojiPickerActive: false,
	}

	handleFilesDropTargetRef = (ref) => {
		this.filesDropTarget = ref;
	}

	handleMenuOptionsRef = (ref) => {
		this.menuOptionsRef = ref;
	}

	handleInputRef = (ref) => {
		this.inputRef = ref;
	}

	handleMessagesContainerRef = (messagesContainer) => {
		this.messagesContainer = messagesContainer ? messagesContainer.base : null;
	}

	handleScrollTo = (region) => {
		const { onTop, onBottom } = this.props;

		if (region === MessageList.SCROLL_AT_BOTTOM) {
			this.setState({ atBottom: true });
			onBottom && onBottom();
			return;
		}

		this.setState({ atBottom: false });

		if (region === MessageList.SCROLL_AT_TOP) {
			onTop && onTop();
		}
	}

	handleUploadClick = (event) => {
		event.preventDefault();
		this.filesDropTarget.browse();
	}

	handleSendClick = (event) => {
		event.preventDefault();
		this.inputRef.el.focus();
		this.handleSubmit(this.state.text);
	}

	handleSubmit = (text) => {
		if (this.props.onSubmit) {
			this.props.onSubmit(text);
			this.setState({ text: '' });
			this.turnOffEmojiPicker();
		}
	}

	handleChangeText = (text) => {
		let value = text;
		const { onChangeText, limitTextLength } = this.props;
		if (limitTextLength && limitTextLength < text.length) {
			value = value.substring(0, limitTextLength);
		}
		this.setState({ text: value });
		onChangeText && onChangeText(value);
	}

	toggleEmojiPickerState = () => {
		this.setState({ emojiPickerActive: !this.state.emojiPickerActive });
	}

	handleEmojiSelect = (emoji) => {
		this.toggleEmojiPickerState();
		this.notifyEmojiSelect(emoji.native);
	}

	handleEmojiClick = () => {
		this.turnOffEmojiPicker();
	}

	turnOffEmojiPicker = () => {
		if (this.state.emojiPickerActive) {
			this.setState({ emojiPickerActive: !this.state.emojiPickerActive });
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
		onUpload,
		messages,
		uploads = false,
		options,
		onChangeDepartment,
		onFinishChat,
		onRemoveUserData,
		lastReadMessageId,
		queueInfo,
		registrationRequired,
		onRegisterUser,
		limitTextLength,
		incomingCallAlert,
		ongoingCall,
		dispatch,
		...props
	}, {
		atBottom = true,
		text,
	}) => (
		<Screen
			color={color}
			title={title || I18n.t('Need help?')}
			fontColor={fontColor}
			agent={agent || null}
			queueInfo={queueInfo}
			nopadding
			onChangeDepartment={onChangeDepartment}
			onFinishChat={onFinishChat}
			onRemoveUserData={onRemoveUserData}
			className={createClassName(styles, 'chat')}
			handleEmojiClick={this.handleEmojiClick}
			{...props}
		>
			<FilesDropTarget
				ref={this.handleFilesDropTargetRef}
				overlayed
				overlayText={I18n.t('Drop here to upload a file')}
				onUpload={onUpload}
			>
				<Screen.Content nopadding>
					{ incomingCallAlert && !!incomingCallAlert.show && <CallNotification { ...incomingCallAlert } dispatch={dispatch} />}
					{ incomingCallAlert?.show && ongoingCall && ongoingCall.callStatus === CallStatus.IN_PROGRESS_SAME_TAB ? <CallIframe { ...incomingCallAlert } /> : null }
					<div className={createClassName(styles, 'chat__messages', { atBottom, loading })}>
						<MessageList
							ref={this.handleMessagesContainerRef}
							avatarResolver={avatarResolver}
							uid={uid}
							messages={messages}
							typingUsernames={typingUsernames}
							conversationFinishedMessage={conversationFinishedMessage}
							lastReadMessageId={lastReadMessageId}
							onScrollTo={this.handleScrollTo}
							handleEmojiClick={this.handleEmojiClick}
						/>
						{this.state.emojiPickerActive && <Picker
							style={{ position: 'absolute', zIndex: 10, bottom: 0, maxWidth: '90%', left: 20, maxHeight: '90%' }}
							showPreview={false}
							showSkinTones={false}
							sheetSize={64}
							onSelect={this.handleEmojiSelect}
							autoFocus={true}
							i18n={{
								search: I18n.t('Search'),
								clear: I18n.t('Clear'),
								notfound: I18n.t('No Emoji Found'),
								categories: {
									search: I18n.t('Search Results'),
									recent: I18n.t('Frequently Used'),
									people: I18n.t('People & Body'),
									nature: I18n.t('Animals & Nature'),
									foods: I18n.t('Food & Drink'),
									activity: I18n.t('Activity'),
									places: I18n.t('Travel & Places'),
									objects: I18n.t('Objects'),
									symbols: I18n.t('Symbols'),
									flags: I18n.t('Flags'),
								},
								categorieslabel: I18n.t('Emoji categories'),
							}}
						/>}
					</div>
				</Screen.Content>
				<Screen.Footer
					options={options ? (
						<FooterOptions ref={this.handleMenuOptionsRef}>
							<Menu.Group>
								{onChangeDepartment && (
									<Menu.Item onClick={onChangeDepartment} icon={ChangeIcon}>{I18n.t('Change department')}</Menu.Item>
								)}
								{onRemoveUserData && (
									<Menu.Item onClick={onRemoveUserData} icon={RemoveIcon}>{I18n.t('Forget/Remove my data')}</Menu.Item>
								)}
								{onFinishChat && (
									<Menu.Item danger onClick={() => onFinishChat(this.menuOptionsRef.base)} icon={FinishIcon}>{I18n.t('Finish this chat')}</Menu.Item>
								)}
							</Menu.Group>
						</FooterOptions>
					) : null}
					limit={limitTextLength
						? <CharCounter
							limitTextLength={limitTextLength}
							textLength={text.length}
						/> : null}
				>
					{ registrationRequired
						? <Button loading={loading} disabled={loading} onClick={onRegisterUser} stack>{I18n.t('Chat now')}</Button>
						: <Composer onUpload={onUpload}
							onSubmit={this.handleSubmit}
							onChange={this.handleChangeText}
							placeholder={I18n.t('Type your message here')}
							value={text}
							notifyEmojiSelect={(click) => { this.notifyEmojiSelect = click; }}
							handleEmojiClick={this.handleEmojiClick}
							ref={this.handleInputRef}
							pre={(
								<ComposerActions>
									<ComposerAction className={createClassName(styles, 'emoji-picker-icon')} onClick={this.toggleEmojiPickerState} text={I18n.t('Choose an emoji')}>
										<EmojiIcon width={20} height={20} />
									</ComposerAction>
								</ComposerActions>
							)}
							post={(
								<ComposerActions>
									{text.length === 0 && uploads && (
										<ComposerAction onClick={this.handleUploadClick} text={I18n.t('Upload file')}>
											<PlusIcon width={20} height={20} />
										</ComposerAction>
									)}
									{text.length > 0 && (
										<ComposerAction onClick={this.handleSendClick} text={I18n.t('Send message')}>
											<SendIcon width={20} height={20} />
										</ComposerAction>
									)}
								</ComposerActions>
							)}
							limitTextLength={limitTextLength}
						/>
					}
				</Screen.Footer>
			</FilesDropTarget>
		</Screen>
	)
}

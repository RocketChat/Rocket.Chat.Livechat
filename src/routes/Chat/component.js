import { Picker } from 'emoji-mart';
import { h, Component } from 'preact';

import { Button } from '../../components/Button';
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
import PrintIcon from '../../icons/print.svg';
import RemoveIcon from '../../icons/remove.svg';
import SendIcon from '../../icons/send.svg';
// import EmojiIcon from '../../icons/smile.svg';
import styles from './styles.scss';

export default class Chat extends Component {
	state = {
		atBottom: true,
		text: '',
		emojiPickerActive: false,
		disable: false,
		disableText: 'Please Wait',
	}

	handleDisableComposer = (disableText) => {
		this.setState({ disable: true, disableText });
	}

	handleEnableComposer = () => {
		this.setState({ disable: false, disableText: 'Please Wait' });
	}

	handleFilesDropTargetRef = (ref) => {
		this.filesDropTarget = ref;
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
		const { disable } = this.state;
		if (disable) {
			return;
		}
		this.filesDropTarget.browse();
	}

	handleSendClick = (event) => {
		event.preventDefault();
		const { disable } = this.state;
		if (disable) {
			return;
		}
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
		onPrintTranscript,
		lastReadMessageId,
		queueInfo,
		limitTextLength,
		resetLastAction,
		...props
	}, {
		atBottom = true,
		text,
		disable = false,
		disableText,
	}) => (
		<Screen
			color={color}
			title={title || I18n.t('Need help?')}
			fontColor={fontColor}
			agent={agent || null}
			queueInfo={queueInfo}
			nopadding
			options={options}
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
					<div id={'chat__messages'} className={createClassName(styles, 'chat__messages', { atBottom, loading })}>
						<MessageList
							ref={this.handleMessagesContainerRef}
							avatarResolver={avatarResolver}
							uid={uid}
							messages={messages}
							typingUsernames={typingUsernames}
							conversationFinishedMessage={conversationFinishedMessage}
							lastReadMessageId={lastReadMessageId}
							onScrollTo={this.handleScrollTo}
							resetLastAction={resetLastAction}
							handleEmojiClick={this.handleEmojiClick}
							onDisableComposer={this.handleDisableComposer}
							onEnableComposer={this.handleEnableComposer}
						/>
						{this.state.emojiPickerActive && <Picker
							style={{ position: 'absolute', zIndex: 10, bottom: 0, maxWidth: '90%', left: 20, maxHeight: '90%' }}
							showPreview={false}
							showSkinTones={false}
							sheetSize={64}
							onSelect={this.handleEmojiSelect}
							autoFocus={true}
						/>}
					</div>
				</Screen.Content>
				<Screen.Footer
					options={options ? (
						<FooterOptions>
							<Menu.Group>
								{onPrintTranscript && (
									<Menu.Item onClick={onPrintTranscript} icon={PrintIcon}>{I18n.t('Print Chat')}</Menu.Item>
								)}
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
						</FooterOptions>
					) : null}
					limit={limitTextLength
						? <CharCounter
							limitTextLength={limitTextLength}
							textLength={text.length}
						/> : null}
				>
					{disable && <Button style={{ width: '100%' }}>
						{disableText}
					</Button>}
					{!disable && <Composer onUpload={onUpload}
						onSubmit={this.handleSubmit}
						onChange={this.handleChangeText}
						placeholder={I18n.t('Type your message here')}
						value={text}
						notifyEmojiSelect={(click) => { this.notifyEmojiSelect = click; }}
						handleEmojiClick={this.handleEmojiClick}
						// Viasat : Hide Emoticon pallet
						//
						// pre={(
						// 	<ComposerActions>
						// 		<ComposerAction onClick={this.toggleEmojiPickerState}>
						// 			<EmojiIcon width={20} height={20} />
						// 		</ComposerAction>
						// 	</ComposerActions>
						// )}
						post={(
							<ComposerActions>
								{text.length === 0 && uploads && (
									<ComposerAction onClick={this.handleUploadClick}>
										<PlusIcon width={20} height={20} />
									</ComposerAction>
								)}
								{text.length > 0 && (
									<ComposerAction onClick={this.handleSendClick}>
										<SendIcon width={20} height={20} />
									</ComposerAction>
								)}
							</ComposerActions>
						)}
						limitTextLength={limitTextLength}
					/>}
				</Screen.Footer>
			</FilesDropTarget>
		</Screen>
	)
}

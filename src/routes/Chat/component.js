import { Component } from 'preact';

import { Composer, ComposerAction, ComposerActions } from '../../components/Composer';
import { FilesDropTarget } from '../../components/FilesDropTarget';
import { FooterOptions } from '../../components/Footer';
import { Menu } from '../../components/Menu';
import { MessageList } from '../../components/Messages';
import { Screen } from '../../components/Screen';
import { createClassName } from '../../components/helpers';
import styles from './styles.scss';
import ChangeIcon from '../../icons/change.svg';
import FinishIcon from '../../icons/finish.svg';
import PlusIcon from '../../icons/plus.svg';
import RemoveIcon from '../../icons/remove.svg';
import SendIcon from '../../icons/send.svg';
import EmojiIcon from '../../icons/smile.svg';


export default class Chat extends Component {
	state = {
		atBottom: true,
		text: '',
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
		this.filesDropTarget.browse();
	}

	handleSendClick = (event) => {
		event.preventDefault();
		this.handleSubmit(this.state.text);
	}

	handleSubmit = (text) => {
		if (this.props.onSubmit) {
			this.props.onSubmit(text);
			this.setState({ text: '' });
		}
	}

	handleChangeText = (text) => {
		this.setState({ text });
		const { onChangeText } = this.props;
		onChangeText && onChangeText(text);
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
		emoji = false,
		options,
		onChangeDepartment,
		onFinishChat,
		onRemoveUserData,
		lastReadMessageId,
		queueInfo,
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
			{...props}
		>
			<FilesDropTarget
				ref={this.handleFilesDropTargetRef}
				overlayed
				overlayText={I18n.t('Drop here to upload a file')}
				onUpload={onUpload}
			>
				<Screen.Content nopadding>
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
						/>
					</div>
				</Screen.Content>
				<Screen.Footer
					options={options ? (
						<FooterOptions>
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
						</FooterOptions>
					) : null}
				>
					<Composer onUpload={onUpload}
						onSubmit={this.handleSubmit}
						onChange={this.handleChangeText}
						placeholder={I18n.t('Type your message here')}
						value={text}
						pre={emoji && (
							<ComposerActions>
								<ComposerAction>
									<EmojiIcon width={20} />
								</ComposerAction>
							</ComposerActions>
						)}
						post={(
							<ComposerActions>
								{text.length === 0 && uploads && (
									<ComposerAction onClick={this.handleUploadClick}>
										<PlusIcon width={20} />
									</ComposerAction>
								)}
								{text.length > 0 && (
									<ComposerAction onClick={this.handleSendClick}>
										<SendIcon width={20} />
									</ComposerAction>
								)}
							</ComposerActions>
						)}
					/>
				</Screen.Footer>
			</FilesDropTarget>
		</Screen>
	)
}

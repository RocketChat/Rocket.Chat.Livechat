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


const toBottom = (el) => el.scrollTop = el.scrollHeight;


export default class Chat extends Component {
	handleSoundRef = (sound) => {
		this.sound = sound;
	}

	handleMessagesContainerRef = (messagesContainer) => {
		this.messagesContainer = messagesContainer;
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
		onUpload,
		onPlaySound,
		onSubmit,
		messages,
		uploads = false,
		emoji = false,
		options,
		onChangeDepartment,
		onFinishChat,
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
			footer={(
				<Composer onUpload={onUpload}
					onSubmit={onSubmit}
					placeholder={I18n.t('Type your message here')}
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
								<Action>
									<PlusIcon width={20} />
								</Action>
							)}
							<Action>
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
						/>
					</div>
				</div>
			</DropFiles>
		</Screen>
	)
}

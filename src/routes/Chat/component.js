import { Component } from 'preact';

import styles from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Avatar from '../../components/Avatar';
import DropFiles from '../../components/DropFiles';
import Composer, { Action, Actions } from '../../components/Composer';
import Typing from '../../components/TypingIndicator';
import Messages from '../../components/Message';
import { throttle, createClassName } from '../../components/helpers';
import Sound from '../../components/Sound';

import Smile from 'icons/smile.svg';
import Plus from 'icons/plus.svg';


import Bell from 'icons/bell.svg';
import BellOff from 'icons/bellOff.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';

export const isBottom = (el) => el.scrollHeight - el.scrollTop === el.clientHeight;
export const isTop = (el) => el.scrollTop === 0;
const toBottom = (el) => el.scrollTop = el.scrollHeight;


export default class Chat extends Component {
	isBottom() {
		return isBottom(this.el);
	}
	bind(el) {
		this.el = el;
	}

	handleScroll() {

		const atBottom = isBottom(this.el);
		if (this.state.atBottom !== atBottom) {
			this.setState({ atBottom });
		}

		if (isTop(this.el)) {
			return this.props.onTop && this.props.onTop();
		}

		if (atBottom) {
			return this.props.onBottom && this.props.onBottom();
		}

	}

	constructor(props) {
		super(props);
		this.state = {
			atBottom: true,
		};
		this.handleScroll = this.handleScroll.bind(this);
		this.bind = throttle(this.bind, 100).bind(this);
	}

	componentDidMount() {
		toBottom(this.el);
	}

	componentDidUpdate() {
		if (this.state.atBottom) {
			toBottom(this.el);
		}
	}

	renderNotification() {
		// if (this.props.sound.enabled) {
		// 	return <Bell width={20} />;
		// }

		return <BellOff width={20} />;
	}

	render = ({ onUpload, onPlaySound, typingUsers, onSubmit, color, messages, user, src, title, subtitle, uploads, emoji = true, notification, minimize, fullScreen, sound }) => (
		<div class={styles.container}>
			{/* <Sound onPlay={onPlaySound} src={sound.src} play={sound.play} /> */}
			<Header color={color}>
				{src && <Header.Picture><Avatar src={src} /></Header.Picture>}
				<Header.Content>
					<Header.Title>{title}</Header.Title>
					<Header.SubTitle>{subtitle}</Header.SubTitle>
				</Header.Content>
				<Header.Actions>
					<Header.Action onClick={notification}>{this.renderNotification()}</Header.Action>
					<Header.Action onClick={minimize}><Arrow width={20} /></Header.Action>
					<Header.Action onClick={fullScreen}><NewWindow width={20} /></Header.Action>
				</Header.Actions>
			</Header>

			<DropFiles onUpload={onUpload}>
				<div className={createClassName(styles, 'main', { atBottom: this.state.atBottom, loading: this.props.loading })}>
					<div ref={this.bind} onScroll={this.handleScroll} className={createClassName(styles, 'main__wrapper')}>
						<Messages messages={messages} user={user} />
						{typingUsers && !!typingUsers.length && <Typing users={typingUsers} />}
					</div>
				</div>
			</DropFiles>

			<Footer>
				<Footer.Content>
					<Composer onUpload={onUpload}
						onSubmit={onSubmit}
						pre={
							emoji && <Actions>
								<Action>
									<Smile width="20" />
								</Action>
							</Actions>
						}
						post={
							uploads && <Actions>
								<Action>
									<Plus width="20" />
								</Action>
							</Actions>
						}
						placeholder="insert your text here"
					/>
				</Footer.Content>
				<Footer.Content>
					<Footer.PoweredBy />
				</Footer.Content>
			</Footer>
		</div>
	)
}

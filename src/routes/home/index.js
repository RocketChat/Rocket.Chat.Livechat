import { h, Component } from 'preact';

import style from './style';
import Header from 'components/Header';
import * as Footer from 'components/Footer';
import Avatar from 'components/Avatar';
import Composer, { Action, Actions } from 'components/Composer';
import Typing from 'components/TypingIndicator';
import Message from 'components/Message';
import { throttle, createClassName } from 'components/helpers';

import Smile from 'icons/smile.svg';
import Plus from 'icons/plus.svg';


import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';

const renderRow = (args, user) => {
	const { u = {}, _id } = args;
	return <Message {...args} key={_id} el="li" me={u._id === user} />;
};

export const isBottom = (el) => el.scrollHeight - el.scrollTop === el.clientHeight;
export const isTop = (el) => el.scrollTop === 0;
const toBottom = (el) => el.scrollTop = el.scrollHeight;
export default class Home extends Component {
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

	render = ({ onUpload, user: { _id }, typingUsers, onSubmit, color, messages, title, subtitle, uploads, emoji = true, notification, minimize, fullScreen }) => (
		<div class={style.container}>
			<Header color={color}>
				<Header.Avatar><Avatar /></Header.Avatar>
				<Header.Content>
					<Header.Title>{title}</Header.Title>
					<Header.SubTitle>{subtitle}</Header.SubTitle>
				</Header.Content>
				<Header.Actions>
					<Header.Action onClick={notification}><Bell width={20} /></Header.Action>
					<Header.Action onClick={minimize}><Arrow width={20} /></Header.Action>
					<Header.Action onClick={fullScreen}><NewWindow width={20} /></Header.Action>
				</Header.Actions>
			</Header>
			<main className={createClassName(style, 'main', { atBottom: this.state.atBottom, loading: this.props.loading })}>
				<div ref={this.bind} onScroll={this.handleScroll} className={createClassName(style, 'main__wrapper')}>
					<ol style="padding:0;">{messages.map((el) => renderRow(el, _id))}</ol>
					{typingUsers && !!typingUsers.length && <Typing users={typingUsers} />}
				</div>
			</main>
			<Footer.Main>
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
				<Footer.Content><Footer.PoweredBy /></Footer.Content>
			</Footer.Main>
		</div>
	)
}

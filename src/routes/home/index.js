import { h, Component } from 'preact';

import style from './style';
import Header from 'components/header';
import Footer, { Container, Powered } from 'components/Footer';
import Avatar from 'components/Avatar';
import Composer, { Action, Actions } from 'components/Composer';
import Message from 'components/Message';
import { throttle, createClassName } from 'components/helpers';

import Smile from 'icons/smile.svg';
import Plus from 'icons/plus.svg';


import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';

const renderRow = (args, user) => {
	const { msg, u } = args;
	return <Message ts={new Date()} msg={msg} me={u._id === user} />;
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
		this.setState({ atBottom });

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
		this.bind = throttle(this.bind, 1000).bind(this);
	}

	componentDidMount() {
		toBottom(this.el);
	}

	componentDidUpdate() {
		if (this.state.atBottom) {
			toBottom(this.el);
		}
	}

	render = ({ user: { _id }, onSubmit, color, messages, title, subtitle, uploads, emoji = true, notification, minimize, fullScreen }) => (
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
			<main onScroll={this.handleScroll} ref={this.bind} className={createClassName(style, 'main', { loading: this.props.loading })}>
				<ol style="padding:0;">{messages.map((el) => renderRow(el, _id))}</ol>
			</main>
			<Footer>
				<Container>
					<Composer
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
				</Container>
				<Container><Powered /></Container>
			</Footer>
		</div>
	);
}

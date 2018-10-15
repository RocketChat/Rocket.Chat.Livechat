import { h } from 'preact';

import style from './style';
import Header from 'components/Header';
import Footer, { Container, Powered } from 'components/Footer';
import Avatar from 'components/Avatar';
import Composer, { Action, Actions } from 'components/Composer';
import Message from 'components/Message';


import Smile from 'icons/smile.svg';
import Plus from 'icons/plus.svg';


import Bell from 'icons/bell.svg';
import Arrow from 'icons/arrow.svg';
import NewWindow from 'icons/newWindow.svg';

const renderRow = (args, user) => {
	const { msg, u } = args;
	return <Message ts={new Date()} msg={msg} me={u._id === user} />;
};

const Home = ({ user: { _id }, onSubmit, color, messages, title, subtitle, uploads, emoji = true, notification, minimize, fullScreen }) => (
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
		<main class={style.main}>
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

export default Home;

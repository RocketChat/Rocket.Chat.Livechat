import { h } from 'preact';

import md from './Markdown';
import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from 'components/Avatar';
import { parseDate, parseMessage } from 'components/helpers';

export const Container = ({ children, ...args }) => (<div {...args} className={createClassName(styles, 'message__container', {})}>{children}</div>);
export const Text = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__text', { me })}>{children}</div>);

export const Content = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__content', { me })} >{children}</div>);

export const Body = ({ me, children, Element = 'div', group, ...args }) => (<Element className={createClassName(styles, 'message', { me, group })} {...args}>
	{children}
</Element>);

const Attachments = ({ attachments }) => <img className={createClassName(styles, 'attachment', {})} src={`http://localhost:3000${ attachments[0].image_url }`} />;
const src = (user) => {
	return user && `http://localhost:3000/avatar/${ user.username }`;
};

const Message = ({ _id, el, msg, ts, me, group, attachments = [], ...args }) => (
	<Body id={_id} me={me} group={group} Element={el} {...args}>
		<Container>
			{!me && <Avatar src={src(args.u)} className={createClassName(styles, 'avatar', { group })} />}
			<Content me={me}>
				{msg && <Text me={me} dangerouslySetInnerHTML={{ __html: md.render(parseMessage(args, msg)) }} />}
				{attachments && attachments.length && <Attachments attachments={attachments} />}
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div>
			</Content>
			{me && <Avatar src={src(args.u)} className={createClassName(styles, 'avatar', { group })} />}
		</Container>
	</Body>
);


export default Message;

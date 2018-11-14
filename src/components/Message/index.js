import { h } from 'preact';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import md from './Markdown';
import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from 'components/Avatar';

const parseDate = (ts) => format(ts, isToday(ts) ? 'HH:mm' : 'dddd HH:mm');

export const Container = ({ children, ...args }) => (<div {...args} className={createClassName(styles, 'message__container', {})}>{children}</div>);
export const Text = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__text', { me })}>{children}</div>);

export const Content = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__content', { me })} >{children}</div>);

export const Body = ({ me, children, Element = 'div', group, ...args }) => (<Element className={createClassName(styles, 'message', { me, group })} {...args}>
	{children}
</Element>);

const Attachments = ({ attachments }) => <img className={createClassName(styles, 'attachment', {})} src={`http://localhost:3000${ attachments[0].image_url }`} />;
const src = (args) => {
	const { u } = args;
	return u && `http://localhost:3000/avatar/${ u.username }`;
};

const Message = ({ _id, el, msg, ts, me, group, attachments = [], ...args }) => (
	<Body id={_id} me={me} group={group} Element={el} {...args}>
		<Container>
			{!me && <Avatar src={src(args)} className={createClassName(styles, 'avatar', { group })} />}
			<Content me={me}>
				{msg && <Text me={me} dangerouslySetInnerHTML={{ __html: md.render(msg) }} />}
				{attachments && attachments.length && <Attachments attachments={attachments} />}
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div>
			</Content>
			{me && <Avatar className={createClassName(styles, 'avatar', { group })} />}

		</Container>
	</Body>
);


export default Message;

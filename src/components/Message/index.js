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

export const Body = ({ me, children, Element = 'div', ...args }) => (<Element className={createClassName(styles, 'message', { me })} {...args}>
	{children}
</Element>);

const Message = ({ _id, el, msg, ts, me, ...args }) => (
	<Body id={_id} me={me} Element={el} {...args}>
		<Container>
			{!me && <Avatar />}
			<Content me={me}>
				<Text me={me} dangerouslySetInnerHTML={{ __html: md.render(msg) }} />
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div>
			</Content>
			{me && <Avatar />}

		</Container>
	</Body>
);


export default Message;

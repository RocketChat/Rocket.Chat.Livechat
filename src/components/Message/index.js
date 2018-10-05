import { h } from 'preact';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import md from './Markdown';
import styles from './styles';
import { createClassName } from '../helpers';
import Avatar from 'components/Avatar';

const parseDate = (ts) => format(ts, isToday(ts) ? 'HH:mm' : 'dddd HH:mm');

const Message = ({ _id, Element = 'div', msg, ts, me, ...args }) => (
	<Element id={_id} className={createClassName(styles, 'message', { me })}
		{...args}
	>
		<div className={createClassName(styles, 'message__container', {})}>
			{!me && <Avatar />}
			<div className={createClassName(styles, 'message__content', { me })} ><div className={createClassName(styles, 'message__text', { me })} dangerouslySetInnerHTML={{ __html: md.render(msg) }} /> <div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div></div>
			{me && <Avatar />}
		</div>
	</Element>
);

export default Message;

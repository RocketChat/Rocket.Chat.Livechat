import { h } from 'preact';
import md from './Markdown';
import styles from './styles';
import { createClassName, getAvatarUrl, getAttachmentUrl } from '../helpers';
import Avatar from 'components/Avatar';
import { parseDate, parseMessage } from 'components/helpers';

export const Container = ({ children, ...args }) => (<div {...args} className={createClassName(styles, 'message__container', {})}>{children}</div>);
export const Text = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__text', { me })}>{children}</div>);

export const Content = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__content', { me })} >{children}</div>);

export const Body = ({ me, children, Element = 'div', group, ...args }) => (<Element className={createClassName(styles, 'message', { me, group })} {...args}>
	{children}
</Element>);

const Attachments = ({ attachments }) => <img className={createClassName(styles, 'attachment', {})} src={getAttachmentUrl(attachments[0].image_url)} />;
const src = (user) => user && user._id && getAvatarUrl(user.username);

const Message = ({ el, me, group, message, ...args }) => (
	<Body id={message._id} me={me} group={group} Element={el} {...args}>
		<Container>
			{!me && <Avatar src={src(message.u)} className={createClassName(styles, 'avatar', { group })} />}
			<Content me={me}>
				{message.msg && <Text me={me} dangerouslySetInnerHTML={{ __html: md.render(parseMessage(message, message.msg)) }} />}
				{message.attachments && message.attachments.length && <Attachments attachments={message.attachments} />}
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(message.ts)}</div>
			</Content>
			{me && <Avatar src={src(message.u)} className={createClassName(styles, 'avatar', { group })} />}
		</Container>
	</Body>
);


export default Message;

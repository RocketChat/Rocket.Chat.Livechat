import md from './Markdown';
import styles from './styles';
import { createClassName, parseDate, parseMessage } from '../helpers';
import Avatar from 'components/Avatar';

export const Container = ({ children, ...args }) => (<div {...args} className={createClassName(styles, 'message__container', {})}>{children}</div>);
export const Text = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__text', { me })}>{children}</div>);

export const Content = ({ children, me, ...args }) => (<div {...args} className={createClassName(styles, 'message__content', { me })} >{children}</div>);

export const Body = ({ me, children, Element = 'div', group, ...args }) => (<Element className={createClassName(styles, 'message', { me, group })} {...args}>
	{children}
</Element>);

const Attachments = ({ attachments }) => <img className={createClassName(styles, 'attachment', {})} src={attachments[0].attachment_url} />;

const Message = ({ _id, el, msg, ts, me, group, avatarUrl, attachmentsUrl, ...args }) => (
	<Body id={_id} me={me} group={group} Element={el} {...args}>
		<Container>
			{!me && <Avatar src={avatarUrl} className={createClassName(styles, 'avatar', { group })} />}
			<Content me={me}>
				{msg && <Text me={me} dangerouslySetInnerHTML={{ __html: md.render(parseMessage(args, msg)) }} />}
				{attachmentsUrl && attachmentsUrl.length && <Attachments attachments={attachmentsUrl} />}
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div>
			</Content>
			{me && <Avatar src={avatarUrl} className={createClassName(styles, 'avatar', { group })} />}
		</Container>
	</Body>
);


Message.Body = Body;
Message.Container = Container;
Message.Content = Content;
Message.Text = Text;


export default Message;

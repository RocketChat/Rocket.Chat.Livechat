import md from './Markdown';
import Attachments from './Attachments';
import styles from './styles';
import Avatar from '../../components/Avatar';
import { createClassName, parseDate, parseMessage } from '../helpers';

export const Body = ({ me, children, Element = 'div', group, className, ...args }) => (
	<Element className={createClassName(styles, 'message', { me, group }, [className])} {...args}>
		{children}
	</Element>
);

export const Container = ({ children, className, ...args }) => (
	<div {...args} className={createClassName(styles, 'message__container', {}, [className])}>{children}</div>
);

export const Text = ({ children, me, className, ...args }) => (
	<div {...args} className={createClassName(styles, 'message__text', { me }, [className])}>{children}</div>
);

export const Content = ({ children, me, className, ...args }) => (
	<div {...args} className={createClassName(styles, 'message__content', { me }, [className])}>{children}</div>
);

const Message = ({ _id, el, msg, ts, me, group, avatarUrl, attachmentsUrl, className, ...args }) => (
	<Body id={_id} me={me} group={group} Element={el} className={className}>
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
Message.Attachments = Attachments;

export default Message;

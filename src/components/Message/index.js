import Attachments from './Attachments';
import md from './Markdown';
import Avatar from '../../components/Avatar';
import { createClassName, parseDate, parseMessage } from '../helpers';
import styles from './styles';


export const Body = ({ me, children, Element = 'div', group, className, ...props }) => (
	<Element className={createClassName(styles, 'message', { me, group }, [className])} {...props}>
		{children}
	</Element>
);

export const Container = ({ children, className, ...props }) => (
	<div {...props} className={createClassName(styles, 'message__container', {}, [className])}>{children}</div>
);

export const Text = ({ children, me, className, ...props }) => (
	<div {...props} className={createClassName(styles, 'message__text', { me }, [className])}>{children}</div>
);

export const Content = ({ children, me, className, ...props }) => (
	<div {...props} className={createClassName(styles, 'message__content', { me }, [className])}>{children}</div>
);

const Message = ({
	_id,
	el,
	msg,
	ts,
	me,
	group,
	avatar,
	attachmentsUrl,
	className,
	...props
}) => (
	<Body id={_id} me={me} group={group} Element={el} className={className}>
		<Container>
			{!me && (
				<Avatar
					src={avatar && avatar.src}
					description={avatar && avatar.description}
					className={createClassName(styles, 'avatar', { group })}
				/>
			)}
			<Content me={me}>
				{msg && <Text me={me} dangerouslySetInnerHTML={{ __html: md.render(parseMessage(props, msg)) }} />}
				{attachmentsUrl && attachmentsUrl.length && <Attachments attachments={attachmentsUrl} />}
				<div className={createClassName(styles, 'message__time', {})}>{parseDate(ts)}</div>
			</Content>
			{me && (
				<Avatar
					src={avatar && avatar.src}
					description={avatar && avatar.description}
					className={createClassName(styles, 'avatar', { group })}
				/>
			)}
		</Container>
	</Body>
);


Message.Body = Body;
Message.Container = Container;
Message.Content = Content;
Message.Text = Text;
Message.Attachments = Attachments;

export default Message;

import Avatar from '../../components/Avatar';
import { createClassName } from '../helpers';
import Attachments from './attachments';
import { parseMessage, parseDate } from './parsers';
import styles from './styles';


export const Body = ({ me, children, el: Element = 'div', group, className, ...props }) => (
	<Element {...props} className={createClassName(styles, 'message', { me, group }, [className])}>
		{children}
	</Element>
);

export const Container = ({ children, className, ...props }) => (
	<div {...props} className={createClassName(styles, 'message__container', {}, [className])}>{children}</div>
);

export const Content = ({ children, className, ...props }) => (
	<div {...props} className={createClassName(styles, 'message__content', {}, [className])}>{children}</div>
);

const createTextProps = ({ children, ...props }) => {
	if (typeof children === 'string') {
		return {
			dangerouslySetInnerHTML: {
				__html: parseMessage({ msg: children, ...props }),
			},
		};
	}

	if (Array.isArray(children) && typeof children[0] === 'string') {
		return {
			dangerouslySetInnerHTML: {
				__html: parseMessage({ msg: children[0], ...props }),
			},
		};
	}

	return { children };
};

export const Text = ({ className, ...props }) => (
	<div
		className={createClassName(styles, 'message__text', {}, [className])}
		{...createTextProps(props)}
	/>
);

export const Time = ({ ts }) => (
	<time dateTime={new Date(ts).toISOString()} className={createClassName(styles, 'message__time', {})}>
		{parseDate(ts)}
	</time>
);

export const Message = ({
	_id,
	el,
	msg,
	ts,
	u = {},
	me,
	group,
	avatarResolver = () => null,
	attachmentsUrl,
	className,
	...props
}) => (
	<Body id={_id} me={me} group={group} el={el} className={className}>
		<Container>
			<Avatar
				src={avatarResolver(u.username)}
				description={u.username}
				className={createClassName(styles, 'message__avatar')}
			/>
			<Content>
				{msg && <Text {...props}>{msg}</Text>}
				{attachmentsUrl && attachmentsUrl.length && <Attachments attachments={attachmentsUrl} />}
				<Time ts={ts} />
			</Content>
		</Container>
	</Body>
);


Message.Body = Body;
Message.Container = Container;
Message.Content = Content;
Message.Text = Text;
Message.Time = Time;
Message.Attachments = Attachments;


export default Message;

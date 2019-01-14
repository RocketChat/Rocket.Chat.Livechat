import styles from './styles';
import { createClassName } from '../helpers';


const UnreadSeparator = () => (
	<div class={createClassName(styles, 'unread')}>
		<hr class={createClassName(styles, 'unread__line')} />
		<span class={createClassName(styles, 'unread__text')}>{I18n.t('unread messages')}</span>
		<hr class={createClassName(styles, 'unread__line')} />
	</div>
);

export default UnreadSeparator;

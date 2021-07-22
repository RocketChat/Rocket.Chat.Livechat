import { h } from 'preact';

import { Screen } from '../Screen';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIFrame = (url) => (
	<Screen.Content nopadding>
		<div className={createClassName(styles, 'call-iframe')}>
			<iframe className={createClassName(styles, 'call-iframe__content')} src={url} />
		</div>
	</Screen.Content>
);

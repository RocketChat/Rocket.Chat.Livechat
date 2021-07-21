import { h } from 'preact';

import { Livechat } from '../../api';
import { Screen } from '../Screen';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIframe = (rid) => {
	const url = `${ Livechat.client.host }/meet/${ rid.rid }`;
	return (
		<Screen.Content nopadding>
			<div className={createClassName(styles, 'call-iframe')}>
				<iframe className={createClassName(styles, 'call-iframe__content')} src={url} />
			</div>
		</Screen.Content>
	);
};

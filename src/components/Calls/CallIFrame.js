import { h } from 'preact';

import { Livechat } from '../../api';
import { createClassName } from '../helpers';
import styles from './styles.scss';


export const CallIframe = (props) => {
	const url = `${ Livechat.client.host }/meet/${ props.rid }`;
	return (
		<div className={createClassName(styles, 'call-iframe')}>
			<iframe className={createClassName(styles, 'call-iframe__content')} src={url} />
		</div>
	);
};

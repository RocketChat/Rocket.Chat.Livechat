import { h } from 'preact';
import { memo } from 'preact/compat';

import { createClassName } from '../../../helpers';
import styles from './styles.scss';

const DividerBlock = () =>
	<hr
		className={createClassName(styles, 'uikit-divider-block')}
	/>;

export default memo(DividerBlock);

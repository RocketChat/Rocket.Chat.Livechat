import { BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';
import { memo } from 'preact/compat';

import { createClassName } from '../../../helpers';
import styles from './styles.scss';

const ContextBlock = ({ elements, parser }) => {
	console.log();
	return <div className={createClassName(styles, 'uikit-context-block')}>
		{elements.map((element, key) =>
			<div key={key} className={createClassName(styles, 'uikit-context-block__item')}>
				{parser.renderContext(element, BLOCK_CONTEXT.CONTEXT)}
			</div>)}
	</div>;
};

export default memo(ContextBlock);

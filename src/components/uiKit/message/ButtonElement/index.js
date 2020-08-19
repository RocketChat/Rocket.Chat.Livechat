import { BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';
import { memo, useCallback } from 'preact/compat';

import { Button } from '../../../Button';
import { createClassName } from '../../../helpers';
import { usePerformAction } from '../Block';
import styles from './styles.scss';

const ButtonElement = ({ text, actionId, url, value, style, context, confirm, parser }) => {
	const [performAction, performingAction] = usePerformAction(actionId, value);

	const handleClick = useCallback(async (event) => {
		event.preventDefault();

		if (confirm) {
			// TODO
		}

		if (url) {
			const newTab = window.open();
			newTab.opener = null;
			newTab.location = url;
			return;
		}

		await performAction();
	}, [confirm, performAction, url]);

	return <Button
		children={parser.text(text)}
		className={createClassName(styles, 'uikit-button', {
			accessory: context === BLOCK_CONTEXT.SECTION,
		})}
		danger={style === 'danger'}
		disabled={performingAction}
		loading={performingAction}
		outline={!style}
		secondary={!style}
		onClick={handleClick}
	/>;
};

export default memo(ButtonElement);

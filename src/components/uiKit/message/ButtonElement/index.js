import { BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';
import { memo, useCallback } from 'preact/compat';

import { Button } from '../../../Button';
import { createClassName } from '../../../helpers';
import { usePerformAction } from '../Block';
import styles from './styles.scss';

const ButtonElement = ({ text, actionId, url, value, style, context, confirm, parser }) => {
	const [performAction, performingAction] = usePerformAction(actionId);

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

		await performAction({ value });
	}, [confirm, performAction, url, value]);

	return <Button
		children={parser.text(text)}
		className={createClassName(styles, 'uikit-button', {
			accessory: context === BLOCK_CONTEXT.SECTION,
			action: context === BLOCK_CONTEXT.ACTION,
		})}
		danger={style === 'danger'}
		disabled={performingAction}
		loading={performingAction}
		outline={!style}
		secondary={!style}
		stack={context === BLOCK_CONTEXT.ACTION}
		onClick={handleClick}
	/>;
};

export default memo(ButtonElement);

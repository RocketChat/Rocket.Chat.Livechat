import { BLOCK_CONTEXT } from '@rocket.chat/ui-kit';
import { h } from 'preact';
import { memo, useCallback } from 'preact/compat';

import { Button } from '../../../Button';
import { createClassName } from '../../../helpers';
import { useBlockId } from '../Block';
import { useActionId } from '../useActionId';
import styles from './styles.scss';

const ButtonElement = ({ text, actionId: _actionId, url, value, style, context, confirm, parser }) => {
	const blockId = useBlockId();
	const actionId = useActionId(_actionId); // TODO

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

		console.log({
			blockId,
			actionId,
			value,
		}); // TODO
	}, []);

	return <Button
		children={parser.text(text)}
		className={createClassName(styles, 'uikit-button', {
			accessory: context === BLOCK_CONTEXT.SECTION,
		})}
		danger={style === 'danger'}
		secondary={!style}
		outline={!style}
		onClick={handleClick}
	/>;
};

export default memo(ButtonElement);

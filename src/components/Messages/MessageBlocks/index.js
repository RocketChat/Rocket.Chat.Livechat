import { h } from 'preact';
import { memo, useCallback } from 'preact/compat';

import {
	triggerAction,
	UIKitIncomingInteractionType,
	UIKitIncomingInteractionContainerType,
} from '../../../lib/uiKit';
import { renderMessageBlocks } from '../../uiKit';
import Surface from '../../uiKit/message/Surface';

const MessageBlocks = ({ blocks = [], mid, rid }) => {
	const dispatchAction = useCallback(({
		appId,
		actionId,
		payload,
	}) => triggerAction({
		appId,
		type: UIKitIncomingInteractionType.BLOCK,
		actionId,
		rid,
		mid,
		viewId: null,
		container: {
			type: UIKitIncomingInteractionContainerType.MESSAGE,
			id: mid,
		},
		payload,
	}), [mid, rid]);

	return <Surface dispatchAction={dispatchAction}>
		{Array.isArray(blocks) && blocks.length > 0
			? renderMessageBlocks(blocks)
			: null}
	</Surface>;
};

export default memo(MessageBlocks);

import { memo } from 'preact/compat';

import { renderMessageBlocks } from '../../uiKit';

const MessageBlocks = ({ blocks = [] }) =>
	(Array.isArray(blocks) && blocks.length > 0
		? renderMessageBlocks(blocks)
		: null);

export default memo(MessageBlocks);

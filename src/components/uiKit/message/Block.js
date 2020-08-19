import { createContext, h } from 'preact';
import { memo, useRef, useContext } from 'preact/compat';

const BlockContext = createContext();

const getBlockId = (blockIdProp, blockIdRef) => {
	if (blockIdProp) {
		return blockIdProp;
	}

	if (!blockIdRef.current) {
		blockIdRef.current = Math.random().toString(36).slice(2);
	}

	return blockIdRef.current;
};

const Block = ({ blockId, children }) => {
	const blockIdRef = useRef();

	const effectiveBlockId = getBlockId(blockId, blockIdRef);

	return <BlockContext.Provider children={children} value={effectiveBlockId} />;
};

export const useBlockId = () => useContext(BlockContext);

export default memo(Block);

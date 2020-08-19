import { createContext, h } from 'preact';
import { memo, useContext, useCallback, useState, useRef, useEffect } from 'preact/compat';

const BlockContext = createContext({
	appId: null,
	blockId: null,
});

const Block = ({ appId, blockId, children }) =>
	<BlockContext.Provider
		children={children}
		value={{
			appId,
			blockId,
		}}
	/>;

export const useAppId = () => useContext(BlockContext).appId;

export const useBlockId = () => useContext(BlockContext).blockId;

export const usePerformAction = (actionId) => {
	const { appId, blockId } = useContext(BlockContext);
	const [performing, setPerforming] = useState(false);
	const mountedRef = useRef(true);

	useEffect(() => () => {
		mountedRef.current = false;
	}, []);

	const perform = useCallback(async (values = {}) => {
		setPerforming(true);

		try {
			// TODO
			console.log({
				appId,
				blockId,
				actionId,
				...values,
			});

			await new Promise((resolve) => setTimeout(resolve, 1000));
		} finally {
			if (mountedRef.current) {
				setPerforming(false);
			}
		}
	}, [actionId, appId, blockId]);

	return [perform, performing];
};

export default memo(Block);

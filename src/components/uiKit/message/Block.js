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

export const usePerformAction = (actionId, value) => {
	const { appId, blockId } = useContext(BlockContext);
	const [performing, setPerforming] = useState(false);
	const mountedRef = useRef(true);

	useEffect(() => () => {
		mountedRef.current = false;
	}, []);

	const perform = useCallback(async () => {
		setPerforming(true);

		// TODO
		console.log({
			appId,
			blockId,
			actionId,
			value,
		});

		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (mountedRef.current) {
			setPerforming(false);
		}
	}, [actionId, appId, blockId, value]);

	return [perform, performing];
};

export default memo(Block);

import { useRef } from 'preact/hooks';

export const useActionId = (actionId) => {
	const actionIdRef = useRef();

	if (actionId) {
		return actionId;
	}

	if (!actionIdRef.current) {
		actionIdRef.current = Math.random().toString(36).slice(2);
	}

	return actionIdRef.current;
};

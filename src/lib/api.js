import { formatDistance } from 'date-fns';

import I18n from '../i18n';
import { getDateFnsLocale } from './locale';

export const normalizeAgent = (agentData) => agentData && { name: agentData.name, username: agentData.username, status: agentData.status };

export const normalizeQueueAlert = (queueInfo) => {
	if (!queueInfo) {
		return;
	}

	const { spot, estimatedWaitTimeSeconds } = queueInfo;
	const locale = getDateFnsLocale();
	const estimatedWaitTime = estimatedWaitTimeSeconds && formatDistance(new Date().setSeconds(estimatedWaitTimeSeconds), new Date(), { locale });
	return spot > 0
	&& (
		estimatedWaitTime
			? I18n.t('Your spot is #%{spot} (Estimated wait time: %{estimatedWaitTime})', { spot, estimatedWaitTime })
			: I18n.t('Your spot is #%{spot}', { spot })
	);
};

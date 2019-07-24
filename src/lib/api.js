export const normalizeAgent = (agentData) => agentData && { name: agentData.name, username: agentData.username, status: agentData.status };

export const normalizeQueueAlert = (queueInfo) => {
	if (!queueInfo) {
		return;
	}

	const { spot } = queueInfo;
	return spot > 0 && I18n.t('Your spot is #%{spot}', { spot });
};

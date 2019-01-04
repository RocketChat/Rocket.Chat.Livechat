import SDK from '../api';

export default {

	async promptTranscript(state) {
		const { config: { settings }, user: { token, visitorEmails }, room: { _id } } = state;
		if (!settings.transcript) {
			return;
		}

		const email = visitorEmails.length > 0 ? visitorEmails[0].address : '';
		// eslint-disable-next-line no-unused-vars
		const transcriptMessage = (settings.transcriptMessage) ? settings.transcriptMessage : 'Would_you_like_a_copy_if_this_chat_emailed'; // (TAPi18n.__('Would_you_like_a_copy_if_this_chat_emailed'));
		/*
		Meteor.call('livechat:sendTranscript', visitor.getToken(), visitor.getRoom(), result.value, (err) => {
			if (err) {
				console.error(err);
			}
			swal({
				title: t('transcript_sent'),
				type: 'success',
				timer: 1000,
				showConfirmButton: false,
			});
		});
		*/
		// TODO: add modal request
		await SDK.requestTranscript(email, { token, rid: _id });
	}
}

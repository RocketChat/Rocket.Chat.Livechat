import { store } from '../../../store';
import { Livechat } from '../../../api';

// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function(search, replacement) {
	const target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

export const customEmoji = (text) => {

	const { emojis } = store.state;
	emojis.forEach((val) => {
		text = text.replaceAll(`:${ val.name }:`, (<img src={`${ Livechat.client.host }/emoji-custom/${ encodeURIComponent(val.name) }.${ val.extension }`} />)) ;
	});
	return text;
}
;

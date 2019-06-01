import { store } from '../../store';
import { Livechat } from '../../api';
import render from 'preact-render-to-string';
import { emojify } from 'react-emojione';

const search = (key, array = []) => array.find((item) => item.name === key || item.aliases.includes(key));

const contentToSend = (text) => {
	const content = [];
	const { emojis } = store.state;
	const message = text.split(/:/g);
	for (let i = 0; i < message.length; i++) {
		const val = search(message[i], emojis);
		if (val) {
			content.push(<img src={`${ Livechat.client.host }/emoji-custom/${ encodeURIComponent(val.name) }.${ val.extension }`} width="25" />);
		} else {
			content.push(message[i]);
		}
	}
	return content;
};

export const customEmojify = (text) => {

	text = emojify(text, { output: 'unicode' });
	const content = contentToSend(text);
	return render(<body> {content} </body>);
};

export default { contentToSend };

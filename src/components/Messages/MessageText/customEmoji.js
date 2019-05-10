import { store } from '../../../store';
import { Livechat } from '../../../api';
import render from 'preact-render-to-string';
import { emojify } from 'react-emojione';

function search(nameKey, myArray) {
	for (let i = 0; i < myArray.length; i++) {
		if (myArray[i].name === nameKey) {
			return myArray[i];
		}
	}
}

export const customEmoji = (text) => {

	const { emojis } = store.state;
	text = emojify(text, { output: 'unicode' });
	const message = text.split(/:/g);
	const content = [];
	for (let i = 0; i < message.length; i++) {
		const val = search(message[i], emojis);
		if (val) {
			content.push(<img src={`${ Livechat.client.host }/emoji-custom/${ encodeURIComponent(val.name) }.${ val.extension }`} width="25" />);
		} else {
			content.push(message[i]);
		}
	}
	return render(<body> {content} </body>);
}
;

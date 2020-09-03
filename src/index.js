import 'emoji-mart/css/emoji-mart.css';
import 'preact/debug';
import './styles/index.scss';

if (!Object.entries) {
	Object.entries = function(obj) {
		const ownProps = Object.keys(obj);
		let i = ownProps.length;
		const resArray = new Array(i); // preallocate the Array
		while (i--) { resArray[i] = [ownProps[i], obj[ownProps[i]]]; }

		return resArray;
	};
}

export { default } from './components/App';

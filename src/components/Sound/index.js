import { h, Component } from 'preact';

export default class Sound extends Component {
	play = () => {
		this.audio.play();
	}

	constructor(props) {
		super(props);
		this.state = { play: false };
	}

	componentDidUpdate(prevProps) {
		if (this.props.play) {
			this.play();
			this.props.onPlay && this.props.onPlay();
		}
	}

	render({ src, ...args }) {
		return <audio src={src} ref={ (audio) => { this.audio = audio } } type="audio/mpeg" />
	}
}
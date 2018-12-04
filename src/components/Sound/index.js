import { h, Component } from 'preact';

export default class Sound extends Component {
	play = () => {
		this.audio.play();
	}

	handleRef = (audio) => {
		this.audio = audio;
	}

	componentDidMount() {
		const { play, onPlay } = this.props;

		if (play) {
			this.play();
			onPlay && onPlay();
		}
	}

	componentDidUpdate() {
		const { play, onPlay } = this.props;

		if (play) {
			this.play();
			onPlay && onPlay();
		}
	}

	render({ src }) {
		return <audio src={src} ref={this.handleRef} type="audio/mpeg" />;
	}
}

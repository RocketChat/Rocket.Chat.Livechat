import { Component } from 'preact';

export class Sound extends Component {
	play = () => {
		this.audio.play();
	}

	handleRef = (audio) => {
		this.audio = audio;
	}

	handlePlayProp = () => {
		const { play } = this.props;

		if (play) {
			this.audio.play();
		} else if (!this.audio.ended) {
			this.audio.pause();
			this.audio.currentTime = 0;
		}
	}

	componentDidMount() {
		this.handlePlayProp();
	}

	componentDidUpdate() {
		this.handlePlayProp();
	}

	render = ({ src, onStart, onStop }) => (
		<audio
			ref={this.handleRef}
			src={src}
			onPlay={onStart}
			onEnded={onStop}
			type="audio/mpeg"
		/>
	)
}

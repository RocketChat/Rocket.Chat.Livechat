import { Component } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';


export default class FilesDropTarget extends Component {
	state = {
		dragLevel: 0,
	}

	handleDragOver = (event) => {
		event.preventDefault();
	}

	handleDragEnter = (event) => {
		event.preventDefault();
		let { dragLevel } = this.state;
		dragLevel++;
		this.setState({ dragLevel });
	}

	handleDragLeave = (event) => {
		event.preventDefault();
		let { dragLevel } = this.state;
		dragLevel--;
		this.setState({ dragLevel });
	}

	handleDrop = (event) => {
		event.preventDefault();
		let { dragLevel } = this.state;
		if (dragLevel === 0) {
			return;
		}

		dragLevel = 0;
		this.setState({ dragLevel });
		const files = Array.from(event.dataTransfer.files);
		return this.props.onUpload && this.props.onUpload(files);
	}

	render = ({
		children,
		className,
		overlayed,
		overlayText,
		// eslint-disable-next-line no-unused-vars
		onUpload,
		...props
	}, { dragLevel }) => (
		<div
			onDragOver={this.handleDragOver}
			onDragEnter={this.handleDragEnter}
			onDragLeave={this.handleDragLeave}
			onDrop={this.handleDrop}
			className={createClassName(styles, 'drop', { overlayed, dragover: dragLevel > 0 }, [className])}
			data-overlay-text={overlayText}
			{...props}
		>
			{children}
		</div>
	)
}

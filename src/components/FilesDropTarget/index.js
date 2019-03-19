import { Component } from 'preact';
import { createClassName } from '../helpers';
import styles from './styles';


export class FilesDropTarget extends Component {
	state = {
		dragLevel: 0,
	}

	handleDragOver = (event) => {
		event.preventDefault();
	}

	handleDragEnter = (event) => {
		event.preventDefault();
		this.setState({ dragLevel: this.state.dragLevel + 1 });
	}

	handleDragLeave = (event) => {
		event.preventDefault();
		this.setState({ dragLevel: this.state.dragLevel - 1 });
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
		overlayed,
		overlayText,
		className,
		style = {},
		children,
	}, { dragLevel }) => (
		<div
			data-overlay-text={overlayText}
			onDragOver={this.handleDragOver}
			onDragEnter={this.handleDragEnter}
			onDragLeave={this.handleDragLeave}
			onDrop={this.handleDrop}
			className={createClassName(styles, 'drop', { overlayed, dragover: dragLevel > 0 }, [className])}
			style={style}
		>
			{children}
		</div>
	)
}

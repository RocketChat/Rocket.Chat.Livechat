import { Component } from 'preact';
import styles from './styles';
import { createClassName } from '../helpers';

export default class DropFile extends Component {
	onDrag(e) {
		e.preventDefault();
		if (this.state.dragover) {
			return;
		}
		this.setState({
			dragover: true,
		});
	}
	onDragend(e) {
		e.preventDefault();
		if (!this.state.dragover) {
			return;
		}
		this.setState({
			dragover: false,
		});
	}
	onDrop(e) {
		e.preventDefault();
		if (!this.state.dragover) {
			return;
		}
		this.setState({
			dragover: false,
		});
		const files = Array.from(e.dataTransfer.files);
		return this.props.onUpload && this.props.onUpload(files);
	}
	constructor() {
		super();
		this.state = {
			dragover: false,
		};
		this.onDrag = this.onDrag.bind(this);
		this.onDragend = this.onDragend.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}
	render({ children, className, ...props }) {
		return (<div onDrag={this.onDrag} onDragstart={this.onDrag} onDragend={this.onDragend} onDragover={this.onDrag} onDragenter={this.onDrag} onDragleave={this.onDragend}
			onDrop={this.onDrop} dragover={this.state.dragover} className={createClassName(styles, 'drop', { dragover: this.state.dragover }, [className])} {...props}
		        >
			{children}
		</div>);
	}
}

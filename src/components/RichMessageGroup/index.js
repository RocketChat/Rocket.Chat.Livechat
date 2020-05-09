import { cloneElement } from 'preact';

import { createClassName, memo, MemoizedComponent } from '../helpers';
import styles from './styles.scss';
import {Button} from '../Button';

export class RichMessageGroup extends MemoizedComponent {

	renderItems = ({

	}) => {
		const items = [];

		let totalRichMessages = 5;

		for(let i=0; i<totalRichMessages; i++){
			items.push(
				<Button small outline>{`Option ${i}`}</Button>
			)
		}

		return items;
	}

	render = ({
		className,
		style = {},
		richMessages,
	}) => (
		<div
			className={createClassName(styles, 'rich-message-group', {}, className)}
			style={style}
		>
			{console.log("From richMessageGroup "+richMessages)}
			{this.renderItems(this.props).map((child) => cloneElement(child, { className: createClassName(styles, 'rich-message-group__item') }))}
		</div>
	)
}

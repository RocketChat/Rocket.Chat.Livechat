import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import Menu, { Group, Item } from '.';

storiesOf('Components|Menu', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Menu hidden={boolean('hidden', false)} />
	))
;

storiesOf('Components|Menu/Group', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('single', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item>Yes</Item>
				<Item>No</Item>
			</Group>
		</Menu>
	))
	.add('multiple', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group #1 title', '')}>
				<Item>Yes</Item>
				<Item>No</Item>
			</Group>
			<Group title={text('group #2 title', '')}>
				<Item>Report</Item>
			</Group>
		</Menu>
	))
	.add('with title', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', 'Are you sure?')}>
				<Item>Yes</Item>
				<Item>No</Item>
			</Group>
		</Menu>
	))
;

const defaultMenuItemText = 'A menu item';
const defaultAnotherMenuItemText = 'Another menu item';

storiesOf('Components|Menu/Item', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('simple', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
	.add('primary', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item primary onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
	.add('danger', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item danger onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
	.add('disabled', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item disabled onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
;

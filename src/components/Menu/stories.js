import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';

import Menu, { Group, Item } from '.';
import Button from '../Button';

const defaultMenuItemText = 'A menu item';
const defaultAnotherMenuItemText = 'Another menu item';

storiesOf('Components|Menu', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('empty', () => (
		<Menu hidden={boolean('hidden', false)} />
	))
	.add('simple', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
	.add('placement', () => (
		<div style={{ position: 'relative' }}>
			<Button>Button</Button>
			<Menu
				hidden={boolean('hidden menu', false)}
				placement={select('placement', ['left-top', 'right-top', 'right-bottom', 'left-bottom'], 'right-bottom')}
			>
				<Group title={text('group title', '')}>
					<Item onClick={action('clicked')}>{text('item text', defaultMenuItemText)}</Item>
					<Item>{defaultAnotherMenuItemText}</Item>
				</Group>
			</Menu>
		</div>
	))
;

storiesOf('Components|Menu/Group', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('single', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', '')}>
				<Item>{defaultMenuItemText}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
	.add('multiple', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group #1 title', '')}>
				<Item>{defaultMenuItemText}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
			<Group title={text('group #2 title', '')}>
				<Item>Report</Item>
			</Group>
		</Menu>
	))
	.add('with title', () => (
		<Menu hidden={boolean('hidden menu', false)}>
			<Group title={text('group title', 'Are you sure?')}>
				<Item>{defaultMenuItemText}</Item>
				<Item>{defaultAnotherMenuItemText}</Item>
			</Group>
		</Menu>
	))
;

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

import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import Typing, { TypingAvatar, TypingIndicator } from '.';

import bertieBartonAvatar from '../Avatar/bertieBarton.png';
import avatar1 from './avatar1.png';
import avatar2 from './avatar2.png';
import avatar3 from './avatar3.png';

storiesOf('Components|TypingIndicator', module)
	.addDecorator(centered)
	.add('three dots', () => <TypingIndicator>The attendant is typing</TypingIndicator>)
	.add('multiple Avatars', () => (
		<TypingAvatar avatars={[
			bertieBartonAvatar,
			avatar1,
			avatar2,
			avatar3,
		]}
		/>))
	.add('as message', () => (
		<Typing users={[bertieBartonAvatar, avatar1, avatar2, avatar3]} description={I18n.t('The attendant is typing')} />
	));

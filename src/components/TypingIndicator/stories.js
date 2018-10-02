import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import TypingIndicator from '.';

storiesOf('Components|TypingIndicator', module)
	.addDecorator(centered)
	.add('three dots', () => <TypingIndicator>The attendant is typing</TypingIndicator>);

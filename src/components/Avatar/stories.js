import { h } from 'preact';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import Avatar from '.';

storiesOf('Components|Avatar', module)
	.addDecorator(centered)
	.add('Normal avatar', () => <Avatar description="user description" />)
	.add('Small avatar', () => <Avatar small description="user description" />)
	.add('Large avatar', () => <Avatar large description="user description" />);

import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import StatusIndicator from '.';

storiesOf('Components|StatusIndicator', module)
	.addDecorator(centered)
	.add('offline', () => <StatusIndicator status="offline" />)
	.add('online', () => <StatusIndicator status="online" />)
	.add('away', () => <StatusIndicator status="away" />)
	.add('busy', () => <StatusIndicator status="busy" />)
;

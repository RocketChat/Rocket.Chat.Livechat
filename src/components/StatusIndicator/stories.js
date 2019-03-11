import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import StatusIndicator from '.';

storiesOf('Components|StatusIndicator', module)
	.addDecorator(centered)
	.add('offline', () => <StatusIndicator status="offline" />)
	.add('online', () => <StatusIndicator status="online" />)
	.add('away', () => <StatusIndicator status="away" />)
	.add('busy', () => <StatusIndicator status="busy" />)
	.add('small', () => <StatusIndicator small status="online" />)
	.add('large', () => <StatusIndicator large status="online" />)
	.add('bordered', () => <StatusIndicator bordered status="online" />)
;

import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import GDPRAgreement from './component';
import constants from '../../lib/constants';

const { gdpr: { consentText: defaultConsentText } } = constants;

storiesOf('Routes|GDPRAgreement', module)
	.addDecorator(screenCentered)
	.addDecorator(withKnobs)
	.add('normal', () => (
		<GDPRAgreement
			title={text('title', 'GDPR')}
			color={color('color', '#C1272D')}
			consentText={text('consentText', defaultConsentText)}
			onAgree={action('agree')}
		/>
	))
;

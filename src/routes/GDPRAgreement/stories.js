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
			theme={{
				color: color('theme.color', ''),
				fontColor: color('theme.fontColor', ''),
				iconColor: color('theme.iconColor', ''),
			}}
			title={text('title', 'GDPR')}
			consentText={text('consentText', defaultConsentText)}
			onAgree={action('agree')}
		/>
	))
;

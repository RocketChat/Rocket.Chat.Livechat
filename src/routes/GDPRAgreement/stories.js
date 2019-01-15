import { action } from '@storybook/addon-actions';
import { withKnobs, color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { screenCentered } from '../helpers.stories';
import GDPRAgreement from './component';


const defaultConsentText = 'The controller of your personal data is Rocket.Chat Technologies Corp., with registered ' +
	'office at 2711 Centerville Road, Suite 400, Wilmington, Delaware, USA. To start the chat you agree that your ' +
	'personal data shall be processed and trasmitted in accordance with the General Data Protection Regulation (GDPR).';

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

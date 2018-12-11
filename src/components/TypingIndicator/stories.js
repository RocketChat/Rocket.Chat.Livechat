import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import TypingIndicator, { TypingDots } from '.';


storiesOf('Components|TypingIndicator', module)
	.addDecorator(centered)
	.add('only dots', () => (
		<TypingDots>{I18n.t('The attendant is typing')}</TypingDots>
	))
	.add('as message', () => (
		<TypingIndicator>{I18n.t('The attendant is typing')}</TypingIndicator>
	))
	.add('with avatars', () => (
		<TypingIndicator
			avatars={[
				{
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
				},
				{
					description: 'tasso.evangelista',
					src: '//gravatar.com/avatar/5ddcdc159b17f4f79fd254a06d871c5a?s=32',
				},
				{
					description: 'martin.schoeler',
					src: '//gravatar.com/avatar/e6662ba16ba3ca2a76857e3999e6d960?s=32',
				},
			]}
		>
			{I18n.t('The attendant is typing')}
		</TypingIndicator>
	))
;

import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Smile from 'icons/smile';
import Plus from 'icons/plus';
import Send from 'icons/send';
import Composer, { Actions, Action } from '.';


storiesOf('Components|Composer', module)
	.addDecorator((storyFn) => (
		<div style={{ display: 'flex', justifyContent: 'stretch', width: '350px' }}>
			{storyFn()}
		</div>
	))
	.addDecorator(withKnobs({
		escapeHTML: false,
	}))
	.addDecorator(centered)
	.add('empty', () => (
		<Composer
			value={text('value', '')}
			placeholder={text('placeholder', 'Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
		/>
	))
	.add('large placeholder', () => (
		<Composer
			value={text('value', '')}
			placeholder={text('placeholder', 'Insert your text here Insert your text here Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
		/>
	))
	.add('plain text', () => (
		<Composer
			value={text('value', 'Should I use &amp; or &?')}
			placeholder={text('placeholder', 'Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
		/>
	))
	.add('emojis', () => (
		<Composer
			value={text('value', ':heart: :smile: :\'(')}
			placeholder={text('placeholder', 'Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
		/>
	))
	.add('mentions', () => (
		<Composer
			value={text('value', '@all, I\'m @here with @user.')}
			placeholder={text('placeholder', 'Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
		/>
	))
	.add('actions', () => (
		<Composer
			value={text('value', '')}
			placeholder={text('placeholder', 'Insert your text here')}
			onChange={action('change')}
			onSubmit={action('submit')}
			onUpload={action('upload')}
			pre={
				<Actions>
					<Action text="Add emoji" onClick={action('click smile')}>
						<Smile width="20" />
					</Action>
					<Action text="Send" onClick={action('click send')}>
						<Send color="#1D74F5" width="20" />
					</Action>
				</Actions>
			}
			post={
				<Actions>
					<Action text="Add attachment" onClick={action('click plus')}>
						<Plus width="20" />
					</Action>
				</Actions>
			}
		/>
	))
	.add('connecting', () => (
		<Composer connecting />
	))
;

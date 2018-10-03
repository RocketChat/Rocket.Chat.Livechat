import { h } from 'preact';
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
	.addDecorator(withKnobs)
	.addDecorator(centered)
	.add('composer with actions', () =>
		(<Composer
			pre={
				<Actions>
					<Action onClick={action('clicked')}>
						<Smile width="20" />
					</Action>
					<Action>
						<Send color="#1D74F5" width="20" />
					</Action>
				</Actions>
			}
			post={
				<Actions>
					<Action>
						<Plus width="20" />
					</Action>
				</Actions>
			}
			placeholder="insert your text here"
			onInput={action('input')}
		/>))
	.add('static composer', () => <Composer placeholder="insert your text here" onInput={action('input')} />)
	.add('large placeholder', () => <Composer placeholder="insert your text here large large large large large large large large large large large large large large large" onInput={action('input')} />);

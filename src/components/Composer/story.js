import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import c from '../../../stories/helper/center';
import Composer from './';

storiesOf('Composer', module).add('static composer', () => c(<Composer placeholder="insert your text here" onInput={action('input')} />));

import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import I18n from '../../i18n';


import c from '../../../stories/helper/center';
import Composer from './';

I18n.changeLocale('pt');
window.I18n = I18n;
console.log(I18n.t('testasd'));


storiesOf('Composer', module).add('static composer', () => c(<Composer placeholder="insert your text here" onInput={action('input')} />));

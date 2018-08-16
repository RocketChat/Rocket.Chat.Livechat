import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
storiesOf('Button', module).add('render button', () => <button onClick={action('clicked')}>Hello, Preact World!</button>);

import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Footer from './';

storiesOf('Footer', module).add('render simple Footer', () => <Footer onClick={action('clicked')}>Powered by Rocket.Chat</Footer>);
storiesOf('Footer', module).add('render Footer with options', () => <Footer onClick={action('clicked')}>Hello, Preact World!</Footer>);

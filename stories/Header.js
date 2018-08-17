import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from '../src/components/header';

storiesOf('Header', module).add('render simple header', () => <Header onClick={action('clicked')}>Need Help?</Header>);
storiesOf('Header', module).add('render header with agent', () => <Header onClick={action('clicked')}>Hello, Preact World!</Header>);

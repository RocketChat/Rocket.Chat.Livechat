import { h } from 'preact';
import { storiesOf } from '@storybook/react';

import c from '../../../stories/helper/center';
import Typing from './';

storiesOf('User Typing', module).add('three dots', () => c(<Typing>The attendant is typing</Typing>));

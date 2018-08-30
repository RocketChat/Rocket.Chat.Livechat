import { h } from 'preact';
import { storiesOf } from '@storybook/react';

import c from '../../../stories/helper/center';
import Avatar from './';

storiesOf('Avatar', module).add('Large Avatar', () => c(<Avatar large description="user description" />));
storiesOf('Avatar', module).add('Normal Avatar', () => c(<Avatar description="user description" />));
storiesOf('Avatar', module).add('Small Avatar', () => c(<Avatar small description="user description" />));

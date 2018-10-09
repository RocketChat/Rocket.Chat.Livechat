import { h } from 'preact';
import { storiesOf } from '@storybook/react';

import c from '../../stories/helper/center';
import Smile from 'icons/smile';
import Plus from 'icons/plus';

storiesOf('Icons', module).add('Smile Icons', () => c(<Smile width="20" />));
storiesOf('Icons', module).add('Plus Icons', () => c(<Plus width="20" />));

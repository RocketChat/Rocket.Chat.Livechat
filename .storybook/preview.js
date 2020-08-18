import { addDecorator, addParameters } from '@storybook/react';
import 'loki/configure-react';
import '../src/styles/index.scss';

addParameters({
  grid: {
    cellSize: 4,
  },
  options: {
    storySort: ([, a], [, b]) => {
      return a.kind.localeCompare(b.kind);
    },
  },
});

import { addDecorator, addParameters } from '@storybook/react';
import '../src/styles/index.scss';

addParameters({
  grid: {
    cellSize: 4,
  },
  options: {
    showRoots: true,
    storySort: ([, a], [, b]) => {
      return a.kind.localeCompare(b.kind);
    },
  },
});

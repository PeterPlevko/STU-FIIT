import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ambulance-list',
  sourceMap: true,
  globalScript: 'src/utils/global.ts',
  testing: {
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$': "@stencil/core/testing/jest-preprocessor"
    },
    transformIgnorePatterns: [`/node_modules/(?!axios)`]
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};

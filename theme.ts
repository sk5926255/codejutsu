'use client';

import { createTheme, Container, rem } from '@mantine/core';

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
  xxxl: rem(1000),
  xxxxl: rem(1100),
  xxxxxl: rem(1200),
};

export const theme = createTheme({
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
    xxl: rem(24),
    xxxl: rem(28),
    xxxxl: rem(32),
  },
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
  primaryColor: 'main',

  colors: {
    // main: [
    //   '#222831',
    //   '#383e46',
    //   '#4e535a',
    //   '#64696f',
    //   '#7a7e83',
    //   '#919498',
    //   '#a7a9ad',
    //   '#bdbfc1',
    //   '#d3d4d6',
    //   '#e9eaea',
    // ],
    main: [
      '#222831',
      '#383e46',
      '#4e535a',
      '#64696f',
      '#7a7e83',
      '#919498',
      '#a7a9ad',
      '#bdbfc1',
      '#d3d4d6',
      '#e9eaea',
    ],
    text: [
      '#393e46',
      '#4d5159',
      '#61656b',
      '#74787e',
      '#888b90',
      '#9c9fa3',
      '#b0b2b5',
      '#c4c5c8',
      '#d7d8da',
      '#ebecec',
      '#ffffff',
    ],
    // highlight: [
    //   '#00adb5',
    //   '#1ab5bc',
    //   '#33bdc4',
    //   '#4dc6cb',
    //   '#66ced3',
    //   '#80d6da',
    //   '#99dee1',
    //   '#b3e6e9',
    //   '#cceff0',
    //   '#e6f7f8',
    //   '#ffffff',
    // ],
    highlight: [
      '#3498db',
      '#48a2df',
      '#5dade2',
      '#71b7e6',
      '#85c1e9',
      '#9acced',
      '#aed6f1',
      '#c2e0f4',
      '#d6eaf8',
      '#ebf5fb',
      '#ffffff',
    ],

    background: [
      '#eeeeee',
      '#f0f0f0',
      '#f1f1f1',
      '#f3f3f3',
      '#f5f5f5',
      '#f7f7f7',
      '#f8f8f8',
      '#fafafa',
      '#fcfcfc',
      '#fdfdfd',
      '#ffffff',
    ],
  },
});

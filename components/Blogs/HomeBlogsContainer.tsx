'use client';

import { Grid } from '@mantine/core';
import BlogCard from './BlogCard';

const HomeBlogsContainer = () => (
  <div>
    <Grid>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
      <Grid.Col span={12}>
        <BlogCard />
      </Grid.Col>
    </Grid>
  </div>
);
export default HomeBlogsContainer;

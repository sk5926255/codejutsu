'use client';

import { Grid } from '@mantine/core';
import BlogCard from './BlogCard';
import { Post } from '@/types';

interface HomeBlogsContainerProps {
  blogs: Post[];
}

const HomeBlogsContainer: React.FC<HomeBlogsContainerProps> = ({ blogs }) => (
  <div>
    <Grid>
      {blogs.map((blog) => (
        <Grid.Col span={12} key={blog.id}>
          <BlogCard blog={blog} />
        </Grid.Col>
      ))}
    </Grid>
  </div>
);
export default HomeBlogsContainer;

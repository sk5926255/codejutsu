import { Box, Container, Flex } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import HomeBlogsContainer from '@/components/Blogs/HomeBlogsContainer';
import classes from './main.module.scss';
import SideTags from '@/components/SideTags';
import getBlogsForCards from '../actions/getBlogsForCards';

export default async function HomePage() {
  const blogs = await getBlogsForCards();

  return (
    <>
      <Container size="xxxxl">
        <>
          <Flex gap={12}>
            <Box flex={2}>
              <HomeBlogsContainer blogs={blogs} />
            </Box>
            <Box flex={1} className={`${classes.sideContent}`}>
              <SideTags />
            </Box>
          </Flex>
        </>
      </Container>
      <ColorSchemeToggle />
    </>
  );
}

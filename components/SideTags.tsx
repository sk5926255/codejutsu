import { Box, Button, Flex, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import createSlug from '@/lib/slugCreator';
import classes from './SideTags.module.scss';

const SideTags = () => {
  const technologyItems = [
    'JavaScript',
    'React',
    'Node.js',
    'HTML',
    'CSS',
    'Python',
    'MongoDB',
    'Docker',
    'GraphQL',
    'VSCode',
  ];
  return (
    <Flex direction="column" gap={8} className={`${classes.sidetags}`}>
      <Text>Discover by tags</Text>
      <Flex wrap="wrap" gap={2}>
        {technologyItems.map((tag, index) => {
          const slug = createSlug(tag);
          return (
            <Box component={Link} href={`/blogs/${slug}`} key={index}>
              <Button className={`${classes.button}`}>{tag}</Button>
            </Box>
          );
        })}
      </Flex>
      <UnstyledButton mr={8} mt={12} color="main.1" className={`${classes.seemorebutton}`}>
        See more topics
      </UnstyledButton>
    </Flex>
  );
};
export default SideTags;

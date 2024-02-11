import { Card, Image, Avatar, Text, Group, ActionIcon, rem, Flex, Title } from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import classes from './BlogCard.module.scss';
import { Post } from '@/types';

interface BlogCardProps {
  blog: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <Card withBorder radius="md" p={0} className={classes.card}>
    <Group wrap="nowrap" gap={0} className={classes.flex}>
      <Image src={blog?.imageUrl} height={200} alt="Something" className={classes.image} />
      <div className={classes.body}>
        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
          technology
        </Text>
        <Title className={classes.title} size="lg" mt="xs" lineClamp={2}>
          {blog?.title}
        </Title>
        <Text mb="xs" size="md" lineClamp={3}>
          {blog?.description}
        </Text>
        <Flex align="center" justify="space-between" wrap="nowrap" gap="xs">
          <Group gap="xs" wrap="nowrap">
            <Avatar
              size={20}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            />
            <Text size="xs">Elsa Typechecker</Text>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {blog?.author?.name}
              feb,11,2023
            </Text>
          </Group>
          <Group gap={8} mr={0}>
            <ActionIcon className={classes.action}>
              <IconHeart style={{ width: rem(16), height: rem(16) }} className={classes.heart} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                className={classes.bookmark}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare style={{ width: rem(16), height: rem(16) }} className={classes.share} />
            </ActionIcon>
          </Group>
        </Flex>
      </div>
    </Group>
  </Card>
);
export default BlogCard;

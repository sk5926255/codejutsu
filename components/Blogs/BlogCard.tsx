import { Card, Image, Avatar, Text, Group, ActionIcon, rem, Flex, Title } from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import classes from './BlogCard.module.scss';
import { theme } from '@/theme';

const BlogCard = () => (
  <Card withBorder radius="md" p={0} className={classes.card}>
    <Group wrap="nowrap" gap={0}>
      <Image
        src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        height={200}
        alt="Something"
      />
      <div className={classes.body}>
        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
          technology
        </Text>
        <Title className={classes.title} size="lg" mt="xs">
          The best laptop for Frontend engineers in 2022
        </Title>
        <Text mb="xs" size="md">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate autem explicabo
          deleniti voluptate ea eos? Vel quam cupiditate consequuntur, nisi iure, nulla aliquid
          voluptates, eaque qui nesciunt esse quasi?
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
              Feb 6th
            </Text>
          </Group>
          <Group gap={8} mr={0}>
            <ActionIcon className={classes.action}>
              <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                color={theme?.colors?.highlight[1]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                color={theme?.colors?.highlight[1]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare
                style={{ width: rem(16), height: rem(16) }}
                color={theme?.colors?.highlight[1]}
              />
            </ActionIcon>
          </Group>
        </Flex>
      </div>
    </Group>
  </Card>
);

export default BlogCard;

'use client';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
  Container,
  Menu,
  Flex,
} from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconHome,
  IconMessageCircle,
  IconPhoto,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import classes from './header.module.scss';
import SquareButton from '../ui/Buttons/SquareButton';
import { CurrentUserType } from '@/types';
import UserButton from '../UserButton';

const mockdata = [
  {
    icon: IconCode,
    title: 'Programming languages',
    description: 'This Pokémons cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

type HeaderProps = {
  currentUser: CurrentUserType | null;
};

export default function Header({ currentUser }: HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Container h="100%" size="xxxxl">
          <Group justify="space-between" h="100%">
            <Title size="xl" className={classes.logo}>
              CodeInsider
            </Title>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Box component={Link} href="#" className={classes.link}>
                Home
              </Box>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <Box component={Link} href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Explore Topics
                      </Box>
                      <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                    </Center>
                  </Box>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Top not found?
                        </Text>
                        <Text size="xs" c="dimmed">
                          Search it here
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <Box component={Link} href="#" className={classes.link}>
                Blogs
              </Box>
            </Group>
            {!currentUser ? (
              <Group visibleFrom="sm">
                <Button variant="default" radius="0" component={Link} href="/authentication">
                  Log in
                </Button>
                <Button
                  variant="filled"
                  bg="main.1"
                  radius="0"
                  component={Link}
                  href="/authentication"
                >
                  Sign up
                </Button>
                <Burger
                  color="white"
                  size="lg"
                  opened={drawerOpened}
                  onClick={toggleDrawer}
                  hiddenFrom="sm"
                />
              </Group>
            ) : (
              <Flex align="center">
                <Menu shadow="md" offset={-16} width={200} withArrow>
                  <Menu.Target>
                    <UserButton
                      image={
                        currentUser.avatarUrl
                          ? currentUser.avatarUrl
                          : 'https://robohash.org/16efc4a1d030beb457bc3af5b07507a4?set=set4&bgset=&size=400x400'
                      }
                      client
                      name={currentUser.name}
                      email={currentUser.email}
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>General</Menu.Label>
                    {currentUser.role === 'ADMIN' && (
                      <Menu.Item
                        component={Link}
                        href="/dashboard"
                        leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}
                      >
                        Dashboard
                      </Menu.Item>
                    )}
                    <Menu.Item
                      leftSection={
                        <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Messages
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Settings
                    </Menu.Item>
                    <Menu.Divider />

                    <Menu.Label>Sensitive zone</Menu.Label>
                    <Menu.Item
                      leftSection={
                        <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Transfer my data
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                      onClick={() => signOut()}
                    >
                      Log out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Burger
                  color="white"
                  size="lg"
                  opened={drawerOpened}
                  onClick={toggleDrawer}
                  hiddenFrom="sm"
                />
              </Flex>
            )}
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="CodeInsider"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Box component={Link} href="#" className={classes.link}>
            Home
          </Box>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Explore Topics
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Box component={Link} href="#" className={classes.link}>
            Blogs
          </Box>
          {/* <Box component={Link} href="#" className={classes.link}>
            Contact
          </Box> */}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <SquareButton
              label="Sign up"
              background="main.1"
              variant="filled"
              onClick={() => alert('clicked')}
            />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

import { Flex, Menu, Title, rem } from '@mantine/core';
import {
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconHome,
} from '@tabler/icons-react';
import Link from 'next/link';
import { CurrentUserType } from '@/types';
import UserButton from '@/components/UserButton';

interface AdminHeaderProps {
  currentUser: CurrentUserType | null;
}

const AdminHeader = ({ currentUser }: AdminHeaderProps) => (
  <Flex align="center" justify="space-between" style={{ width: '100%' }}>
    <Title>CodeInsider</Title>

    <Menu shadow="md" offset={-16} width={200} withArrow>
      <Menu.Target>
        <UserButton
          image={
            currentUser?.avatarUrl
              ? currentUser.avatarUrl
              : 'https://robohash.org/16efc4a1d030beb457bc3af5b07507a4?set=set4&bgset=&size=400x400'
          }
          name={currentUser?.name || ''}
          email={currentUser?.email || ''}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item
          component={Link}
          href="/"
          leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}
        >
          Home
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Divider />

        <Menu.Label>Sensitive zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </Flex>
);
export default AdminHeader;

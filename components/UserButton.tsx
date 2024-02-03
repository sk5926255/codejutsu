import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.scss';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  client?: boolean;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, client, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" size="md" variant="filled" />

        <div style={{ flex: 1 }} className={`${classes.userInfo}`}>
          <Text
            size="md"
            fw={600}
            style={{ textTransform: 'capitalize' }}
            c={client ? 'white' : 'main.9'}
          >
            {name}
          </Text>

          <Text c={client ? 'white' : 'dimmed'} size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;

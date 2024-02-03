import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton, Flex } from '@mantine/core';
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
        <Flex align="center" gap={8} mr={-10}>
          <Avatar
            src={image}
            radius="xl"
            size="md"
            variant="filled"
            style={{ border: '1px solid white' }}
          />

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
        </Flex>

        {icon || <IconChevronDown size="1.5rem" className={classes.rightArrow} />}
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;

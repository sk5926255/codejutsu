'use client';

import { upperFirst, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { useMutation } from 'react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { GoogleButton } from './GoogleButton';
import { baseUrl } from '@/constants';

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const registerMutation = useMutation((data) =>
    fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  );

  const onSubmit = async (data) => {
    if (type === 'register') {
      try {
        const response = await registerMutation.mutateAsync(data);
        if (response.ok) {
          notifications.show({
            title: 'Registered Successfully',
            icon: <IconX />,
            message: 'Now you can register successfully',
          });
        } else if (response.status === 400) {
          notifications.show({
            title: 'Register already exists',
            message: 'use another email',
          });
        }
      } catch (error) {
        console.log(error, 'an error occured');
      }
    } else {
      try {
        // setIsLoading(true);
        signIn('credentials', {
          ...data,
          redirect: false,
        }).then((callback) => {
          // setIsLoading(false);

          if (callback?.ok) {
            notifications.show({
              title: 'Login Successful',
              message: 'Welcome back',
            });
            router.refresh();
            router.push('/');
          }
          if (callback?.error) {
            notifications.show({
              title: 'Login Failed',
              message: callback?.error,
            });
          }
        });
      } catch (error) {
        console.log(error, 'an error occured');
      }
    }
  };

  return (
    <Paper radius="md" p="xl" style={{ margin: '0 auto', width: '400px' }} withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to CodeJutsu, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

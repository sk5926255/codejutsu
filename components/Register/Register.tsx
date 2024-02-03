import { useDisclosure } from '@mantine/hooks';
import {
  Box,
  Checkbox,
  Drawer,
  Flex,
  PasswordInput,
  Popover,
  Progress,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import classes from './Register.module.scss';
import SquareButton from '../ui/Buttons/SquareButton';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const Register = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // Password's Logic
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        alert('clicnked');
        alert(JSON.stringify(values));
      })}
    >
      <Drawer
        className={`${classes.register}`}
        offset={8}
        opened={opened}
        onClose={close}
        position="right"
        title="Sign up"
      >
        <Flex gap="xs" direction="column">
          <TextInput
            label="Name"
            defaultValue="Ahmad khan"
            placeholder="John Depp"
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Enter your email"
            error="Invalid email"
            defaultValue="john@gmail.com"
            classNames={{ input: classes.invalid }}
            {...form.getInputProps('email')}
            value={form.values.email}
            rightSection={
              <IconAlertTriangle
                stroke={1.5}
                style={{ width: rem(18), height: rem(18) }}
                className={classes.icon}
              />
            }
          />

          {/* Password's Area */}
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Your password"
                  placeholder="Enter your password"
                  value={form.values.password}
                  defaultValue="...."
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                />
                <Progress color={color} value={strength} size={5} mt="xs" mb="xs" />
              </div>
            </Popover.Target>
            <Popover.Dropdown mt="-xs">
              <PasswordRequirement
                label="Includes at least 6 characters"
                meets={form.values.password.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
          <SquareButton label="Sign Up" variant="filled" background="highlight.1" type="submit" />
        </Flex>
      </Drawer>

      <SquareButton
        label="Sign up"
        type="button"
        onClick={open}
        variant="filled"
        background="main.1"
      />
    </form>
  );
};

export default Register;

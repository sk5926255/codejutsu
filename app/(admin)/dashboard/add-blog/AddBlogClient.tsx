'use client';

import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import TextEditor from './RichEditor';
import { baseUrl } from '@/constants';
import { BlogData } from '@/types';

const AddBlogClient = () => {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      content: '',
      tags: '',
    },
  });

  const postMutation = useMutation((data: BlogData) =>
    fetch(`${baseUrl}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  );

  const onPostSubmit = async (data: BlogData) => {
    try {
      const response = await postMutation.mutateAsync(data);
      if (response.ok) {
        notifications.show({
          title: 'Success',
          icon: <IconX />,
          message: 'Blog Added Success fully',
        });
      }
    } catch (error) {
      console.error(error, 'an error occured');
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onPostSubmit)}>
        <TextInput
          withAsterisk
          label="Blog title"
          required
          placeholder="add your blog title here..."
          {...form.getInputProps('title')}
        />
        <Textarea
          withAsterisk
          required
          label="Blog description"
          rows={8}
          placeholder="add you blog description here..."
          {...form.getInputProps('description')}
        />
        <Textarea
          withAsterisk
          required
          label="Blog tags"
          rows={8}
          placeholder="add you blog tags here..."
          {...form.getInputProps('tags')}
        />

        <TextEditor setDescription={(content) => form.setFieldValue('content', content)} />
        {/* <TextEditor content={form.values.content} onChange={form.setFieldValue('content')} /> */}
        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="filled" bg="main.1">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};
export default AddBlogClient;

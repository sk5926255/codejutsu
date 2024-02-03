'use client';

import { Box, Button, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import TextEditor from './RichEditor';
import { baseUrl } from '@/constants';
import { BlogData } from '@/types';
import ImageDrop from '@/components/ADMIN/dropzone/ImageDrop';

const AddBlogClient = () => {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      content: '',
      tags: '',
      image: null as File | null,
    },
  });

  const postMutation = useMutation((data: FormData) =>
    fetch(`${baseUrl}/blog`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(data),
    })
  );

  // Handle file drop in ImageDrop
  const handleImageDrop = (files: File[]) => {
    const imageFile = files[0];
    form.setFieldValue('image', imageFile);
    console.log(form.values, 'formvalues');
  };

  const onPostSubmit = async (data: BlogData) => {
    try {
      const formData = new FormData();

      // Append text data
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('content', data.content);
      formData.append('tags', data.tags);

      // Append the image file
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await postMutation.mutateAsync(formData);
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
          mb={12}
          placeholder="add you blog tags here..."
          {...form.getInputProps('tags')}
        />

        <TextEditor setDescription={(content) => form.setFieldValue('content', content)} />

        <Box mt={12} />
        <ImageDrop onDrop={handleImageDrop} />
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

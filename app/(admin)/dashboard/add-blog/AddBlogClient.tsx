'use client';

import { Box, Button, Flex, Group, Select, TagsInput, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import TextEditor from './RichEditor';
import { baseUrl } from '@/constants';
import { BlogData } from '@/types';
import ImageDrop from '@/components/ADMIN/dropzone/ImageDrop';
import classes from './AddBlogClient.module.scss';

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

interface AddBlogClientProps {
  categories: Category[];
}

const AddBlogClient: React.FC<AddBlogClientProps> = ({ categories }) => {
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      content: '',
      tags: '' as string,
      image: null as File | null,
      category: '' as string,
      newCategory: '' as string,
    },
  });

  const uniqueCategories = categories.reduce(
    (unique, category) =>
      unique.find((item) => item.name === category.name) ? unique : [...unique, category],
    [] as Category[]
  );

  const handleCategoryChange = (value: string | null) => {
    console.log(form.values, 'form values');
    if (value) {
      form.setFieldValue('category', value);
      setIsOtherCategory(value === 'Other');
    }
  };

  const postMutation = useMutation((data: FormData) =>
    fetch(`${baseUrl}/blog`, {
      method: 'POST',
      body: data,
    })
  );

  // Handle file drop in ImageDrop
  const handleImageDrop = (files: File[]) => {
    const imageFile = files[0];
    form.setFieldValue('image', imageFile);
  };

  const onPostSubmit = async (data: BlogData) => {
    if (data.image === null) {
      notifications.show({
        title: 'Error',
        icon: <IconX />,
        message: 'Please upload an image',
      });
      // return;
    }
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('content', data.content);
      formData.append('tags', data.tags);
      formData.append('category', data.category);

      if (data.newCategory) {
        formData.append('newCategory', data.newCategory);
      }
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
    <Flex mx="auto" gap={20} className={classes.AddBlogClient}>
      <form onSubmit={form.onSubmit(onPostSubmit)} className={classes.form}>
        <TextInput
          withAsterisk
          className={classes.titleInput}
          size="xl"
          required
          autoFocus
          variant="unstyled"
          placeholder="add your blog title here..."
          {...form.getInputProps('title')}
        />
        <Textarea
          withAsterisk
          required
          className={classes.descriptionInput}
          rows={8}
          variant="unstyled"
          size="md"
          placeholder="add you blog description here..."
          {...form.getInputProps('description')}
        />

        <Flex gap={8}>
          <Select
            flex={1}
            data={[
              ...uniqueCategories.map((category) => ({
                value: category.name,
                label: category.name,
              })),
              { value: 'Other', label: 'Other' },
            ]}
            size="md"
            variant="unstyled"
            className={classes.categorySelect}
            label="Select a category"
            placeholder="Select Category"
            onChange={handleCategoryChange}
            mt={8}
            mb={12}
          />
          {isOtherCategory && (
            <TextInput
              flex={1}
              size="md"
              label="Add New Category"
              variant="unstyled"
              className={classes.otherCategoryInput}
              placeholder="Enter new category"
              {...form.getInputProps('newCategory')}
              mt={8}
              mb={12}
            />
          )}
        </Flex>

        <TagsInput
          label="Add Tags"
          placeholder="Add upto 10 tags here... (press enter to add)"
          size="md"
          maxTags={10}
          variant="unstyled"
          className={classes.tagsInput}
          {...form.getInputProps('tags')}
          mt={8}
          mb={12}
        />
        <TextEditor setDescription={(content) => form.setFieldValue('content', content)} />

        <Box mt={12} />
        <ImageDrop onDrop={handleImageDrop} />
        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="filled" bg="main.1">
            {postMutation.isLoading ? 'Loading...' : 'Post Blog'}
          </Button>
        </Group>
      </form>
    </Flex>
  );
};
export default AddBlogClient;

import getCategories from '@/app/actions/getCategories';
import AddBlogClient from './AddBlogClient';

const CreateBlog = async () => {
  const categories = await getCategories();

  console.log(categories, 'categories');
  return (
    <div>
      <AddBlogClient categories={categories} />
    </div>
  );
};
export default CreateBlog;

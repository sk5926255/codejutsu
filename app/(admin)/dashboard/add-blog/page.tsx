import getCategories from '@/app/actions/getCategories';
import AddBlogClient from './AddBlogClient';

const CreateBlog = async () => {
  const categories = await getCategories();

  return (
    <div>
      <AddBlogClient categories={categories} />
    </div>
  );
};
export default CreateBlog;

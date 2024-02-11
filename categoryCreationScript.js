const prisma = require('./lib/prismadb.js');

const categories = [
  {
    name: 'Programming',
    slug: 'programming',
    subcategories: [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Python', slug: 'python' },
      { name: 'Java', slug: 'java' },
      // add more subcategories as needed
    ],
  },
  {
    name: 'Data Science',
    slug: 'data-science',
    subcategories: [
      { name: 'Machine Learning', slug: 'machine-learning' },
      { name: 'Data Visualization', slug: 'data-visualization' },
      // add more subcategories as needed
    ],
  },
  // add more main categories as needed
];

async function main() {
  // Use Promise.all to wait for all categories to be created
  await Promise.all(
    categories.map(async (category) => {
      // Create main category
      const mainCategory = await prisma.category.create({
        data: {
          name: category.name,
          slug: category.slug,
        },
      });

      // Use Promise.all to wait for all subcategories to be created
      await Promise.all(
        category.subcategories.map((subcategory) =>
          prisma.category.create({
            data: {
              name: subcategory.name,
              slug: subcategory.slug,
              parentId: mainCategory.id, // set parent ID to create a relation
            },
          })
        )
      );
    })
  );
}

main();

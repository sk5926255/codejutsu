import prisma from '@/lib/prismadb';

export default async function getBlogs() {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return blogs;
  } catch (error: any) {
    throw new Error(error);
  }
}

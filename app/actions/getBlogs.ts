// import { DateTime } from 'luxon'; // Assuming you are using Luxon for date-time handling
import prisma from '@/lib/prismadb';

export default async function getBlogs() {
  try {
    const blogs = await prisma.post.findMany({
      where: {
        createdAt: {
          not: {
            equals: null,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return blogs;
  } catch (error: any) {
    throw new Error(error);
  }
}

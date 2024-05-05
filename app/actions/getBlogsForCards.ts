import prisma from '@/lib/prismadb';
import { triggerAsyncId } from 'async_hooks';

export default async function getBlogsForCards() {
  try {
    const blogs = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              }
            }
          }
        },
        Categories: {
          select: {
            category: {
              select: {
                name: true,
              }
            }
          }
        }
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

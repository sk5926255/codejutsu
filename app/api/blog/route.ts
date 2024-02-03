import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.description || !body.content || !body.tags) {
    return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in to create a post' },
      { status: 401 }
    );
  }

  const categoriesArray = body.tags.split(',');

  try {
    const createdPost = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        publishedDate: new Date(),
        author: {
          connect: { id: currentUser.id },
        },
        // both do same work
        // authorId: currentUser.id,
        categories: categoriesArray,
      },
    });

    return NextResponse.json({
      message: 'Post created successfully',
      post: createdPost,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}

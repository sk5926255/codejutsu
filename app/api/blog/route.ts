import { NextResponse } from 'next/server';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prismadb';

cloudinary.config({
  cloud_name: 'dxqpvr1ib',
  api_key: '983141661713276',
  api_secret: 'OATRQtz2PP7kcvxAt2d_BqeG2ug',
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image') as File;

  // if (image) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const response = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err || !result) {
          reject(err || new Error("no result from cloudinary's upload_stream"));
        }
        resolve(result);
      })
      .end(buffer);
  });
  revalidatePath('/');

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in to create a post' },
      { status: 401 }
    );
  }

  if (response && response.secure_url) {
    try {
      const tags = formData.get('tags')?.toString().split(',');
      const category = formData.get('category') as string;
      const newCategory = formData.get('newCategory') as string;

      const createdPost = await prisma.post.create({
        data: {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          content: formData.get('content') as string,
          publishedDate: new Date(),
          author: {
            connect: { id: currentUser.id },
          },
          imageUrl: response.secure_url,
        },
      });

      if (tags) {
        try {
          await Promise.all(
            tags.map(async (tagName) => {
              const slug = tagName.toLowerCase().replace(/ /g, '-');
              const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: { score: { increment: 1 } },
                create: { name: tagName, slug, score: 1 },
              });

              await prisma.tagPost.create({
                data: {
                  tagId: tag.id,
                  postId: createdPost.id,
                },
              });
            })
          );
        } catch (error) {
          console.log(error, 'an error occured');
        }
      }

      try {
        if (newCategory) {
          const slug = newCategory.toLowerCase().replace(/ /g, '-');
          const createdCategory = await prisma.category.create({
            data: {
              name: newCategory,
              score: 1,
              slug,
            },
          });

          await prisma.categoryPost.create({
            data: {
              categoryId: createdCategory.id,
              postId: createdPost.id,
            },
          });
        } else {
          const existingCategory = await prisma.category.findUnique({
            where: { name: category },
          });

          if (existingCategory) {
            await prisma.category.update({
              where: { id: existingCategory.id },
              data: { score: { increment: 1 } },
            });
          }

          if (existingCategory?.id) {
            await prisma.categoryPost.create({
              data: {
                categoryId: existingCategory.id,
                postId: createdPost.id,
              },
            });
          }
        }
      } catch (error) {
        console.log(error, 'something went wrong');
        throw new Error('Error creating category');
      }

      return NextResponse.json({
        message: 'Post created successfully',
        post: createdPost,
      });
    } catch (error) {
      return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
    }
  } else {
    console.log('error uploading image');
    return NextResponse.json({ message: 'Error uploading image' }, { status: 500 });
  }
}

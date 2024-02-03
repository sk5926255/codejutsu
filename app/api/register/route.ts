import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  const body = await request.json();

  const isUserExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (isUserExists) {
    return new NextResponse('User already exists', { status: 400 });
  }

  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      username: '',
      bio: '',
      avatarUrl: '',
      website: '',
    },
  });

  return NextResponse.json(user);
}

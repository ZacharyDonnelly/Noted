import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(
  name: string,
  email: string,
  passwordHash: string,
  res: NextApiResponse
): Promise<NextResponse<{ message: string } | { name: string; email: string }>> {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  let user;
  if (!existingUser) {
    try {
      user = await prisma.user.create({
        data: { name, email, passwordHash }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return NextResponse.json({ message: `Prisma error P2002! - ${e.message}` }, { status: 400 });
        }
        return NextResponse.json({ message: `Prisma error - ${e.message}` }, { status: 400 });
      }
    }
  } else {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }
  return NextResponse.json({ name, email }, { status: 201 });
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<
  NextResponse<
  | { error: any }
  | {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    passwordHash: string;
  }
  >
  > {
  const { searchParams }: URL = new URL(req.url as string);
  const name: string = searchParams.get('name') as string;
  const email: string = searchParams.get('email') as string;
  const password: string = searchParams.get('password') as string;
  const confirmPassword: string = searchParams.get('confirmPassword') as string;
  const passwordHash: string = bcrypt.hashSync(password, 10);

  if (password.length < 6) {
    console.error('Password is not at least 6 characters');
    return NextResponse.json({ error: 'Password is not at least 6 characters' }, { status: 400 });
  }

  if (password === confirmPassword) {
    try {
      await registerUser(name, email, passwordHash, res);
    } catch (error) {
      console.error('error', error);
      return NextResponse.json({ error }, { status: 400 });
    }
  }
  return NextResponse.json({ email, name, password, confirmPassword, passwordHash });
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextResponse<{ message: string }>> {
  return NextResponse.json({ message: 'sdfsdfsdf' });
}

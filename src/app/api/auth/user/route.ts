import getURLParams from '@/utils/helpers/getURLParameters';
import { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type User = {
  id?: number;
  email: string;
  passwordHash: string;
  name: string;
} | null;

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

const registerUser = async (name: string, email: string, passwordHash: string): Promise<Response> => {
  let user: User = { email, passwordHash, name };
  const existingUser: User = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return Response.json({ message: 'User already exists' }, { status: 400 });
  }
  try {
    user = await prisma.user.create({
      data: { name, email, passwordHash }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return Response.json({ message: `Prisma error P2002! - ${error.message}` }, { status: 400 });
      }
      return Response.json({ message: `Prisma error - ${error.message}` }, { status: 400 });
    }
    return Response.json({ message: 'User already exists' }, { status: 401 });
  }
  return Response.json({ name, email }, { status: 201 });
};

export async function POST(req: NextApiRequest): Promise<Response> {
  const url: string = req.url as string;

  const name: string = getURLParams('name', url);
  const email: string = getURLParams('email', url);
  const password: string = getURLParams('password', url);
  const passwordHash = bcrypt.hashSync(password, 10) as string;

  if (password.length < 6) {
    return Response.json({ message: 'Password is not at least 6 characters' }, { status: 400 });
  }
  try {
    await registerUser(name, email, passwordHash);
  } catch (error) {
    return Response.json({ message: 'Error creating user', error }, { status: 400 });
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return NextResponse.json({ email, name, passwordHash }, { status: 200 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

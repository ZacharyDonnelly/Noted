import rateLimit from '@/utils/api/rate-limit';
import { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { text } from 'stream/consumers';

type User = {
  id?: number;
  email: string;
  passwordHash: string;
  name: string;
} | null;

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500 // Max 500 users per second
});

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

const registerUser = async (
  name: string,
  email: string,
  passwordHash: string,
  res: NextApiResponse
): Promise<Response> => {
  let user: User = { email, passwordHash, name };
  const existingUser: User = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return Response.json({ message: 'User already exists' }, { status: 400 });
  }
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN');
    user = await prisma.user.create({
      data: { name, email, passwordHash }
    });
    NextResponse.redirect('/dashboard', 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return Response.json({ message: `Prisma error P2002! - ${error.message}` }, { status: 400 });
      }
      return Response.json({ message: `Prisma error - ${error.message}` }, { status: 400 });
    }
    return Response.json({ message: 'User already exists' }, { status: 401 });
  }

  return NextResponse.json({ name, email }, { status: 200 });
};

export async function POST(req: NextApiRequest, res: NextApiResponse): Promise<Response> {
  const body = await text(req.body);
  const data = JSON.parse(body);

  const passwordHash = bcrypt.hashSync(data.password, 10) as string;

  if (data.password.length < 6) {
    return Response.json({ message: 'Password is not at least 6 characters' }, { status: 400 });
  }
  try {
    await registerUser(data.name, data.email, passwordHash, res);
  } catch (error) {
    return Response.json({ message: 'Error creating user', error }, { status: 400 });
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return NextResponse.json({ name: data.name, email: data.email, passwordHash }, { status: 200 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

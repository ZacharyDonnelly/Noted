import { LocUser } from '@/types/api/callbacks';
import { LocalUser } from '@/types/index';
import getURLParams from '@/utils/helpers/getURLParameters';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// TODO: Can remove this file
async function registerUser(email: string, passwordHash: string): Promise<NextResponse<any>> {
  try {
    const user: Partial<LocalUser> = { email, passwordHash };
    const existingUser: LocUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    return NextResponse.json({ existingUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
  return NextResponse.json({ message: 'User created' }, { status: 201 });
}

export async function POST(
  req: NextApiRequest
): Promise<NextResponse<{ email: string; passwordHash: string }> | Response> {
  const url: string = req.url as string;

  const email: string = getURLParams('email', url);
  const password: string = getURLParams('password', url);
  const passwordHash: string = bcrypt.hashSync(password, 10);

  try {
    await registerUser(email, passwordHash);
  } catch (error) {
    return Response.json({ message: 'Error creating user', error }, { status: 400 });
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return NextResponse.json({ email, passwordHash }, { status: 200 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

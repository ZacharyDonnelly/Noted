import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(
  emailAddress: string,
  passwordHash: string,
  res: NextApiResponse
): Promise<NextResponse<any>> {
  try {
    const hashCompare = await bcrypt.compare('password', passwordHash);

    console.log(`COMPARE_HASH: ${hashCompare}`); // eslint-disable-line no-console

    const existingUser = await prisma.user.findUnique({ where: { email: emailAddress } });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    return NextResponse.json({ existingUser }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ message: e.message }, { status: 400 });
      }
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
  }
  return NextResponse.json({ message: 'User created' }, { status: 201 });
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextResponse<{ email: string; passwordHash: string }>> {
  const { searchParams }: URL = new URL(req.url as string);
  const email: string = searchParams.get('email') as string;
  const password: string = searchParams.get('password') as string;
  const passwordHash: string = bcrypt.hashSync(password, 10);

  try {
    await registerUser(email, passwordHash, res);
  } catch (e) {
    console.error('error', e);
    throw new Error(`Error registering user: ${e}`);
  }

  return NextResponse.json({ email, passwordHash }, { status: 201 });
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

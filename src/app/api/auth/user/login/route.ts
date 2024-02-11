import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(emailAddress: string, passwordHash: string, res: NextApiResponse): Promise<void> {
  try {
    const hashCompare = await bcrypt.compare('password', passwordHash);

    console.log(`COMPARE_HASH: ${hashCompare}`); // eslint-disable-line no-console

    const existingUser = await prisma.user.findUnique({ where: { email: emailAddress } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    return res.status(201).json({ existingUser });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
  return res.status(201).json({ message: 'User created' });
}

export const hashPassword = (password: string): string => bcrypt.hashSync(password, 10);
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextResponse<{ emailAddress: string; password: string }>> {
  const { emailAddress, password } = req.body;

  try {
    const passwordHash: string = hashPassword(password);
    await registerUser(emailAddress, passwordHash, res);
  } catch (e) {
    console.error('error', e);
    throw new Error(`Error registering user: ${e}`);
  }

  return NextResponse.json({ emailAddress, password });
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(name: string, email: string, passwordHash: string, res: NextApiResponse): Promise<void> {
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
          return res.status(400).json({ message: `Prisma error P2002! - ${e.message}` });
        }
        return res.status(400).json({ message: `Prisma error - ${e.message}` });
      }
    }
  } else {
    return res.status(400).json({ message: 'User already exists' });
  }
  return res.status(201).json({ user });
}

export const hashPassword = (password: string): string => bcrypt.hashSync(password, 10);
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextResponse<{ email: string; password: string; message: string }>> {
  const { name, email, password, confirmPassword } = req.body;

  if (password.length < 6) {
    console.error('Password is not at least 6 characters');
    return res.status(400).json({ message: 'Password is not at least 6 characters' });
  }

  if (password === confirmPassword) {
    try {
      const passwordHash: string = hashPassword(password);
      await registerUser(name, email, passwordHash, res);
    } catch (error) {
      console.error('error', error);

      return res.status(400).json({ error });
    }
  } else {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

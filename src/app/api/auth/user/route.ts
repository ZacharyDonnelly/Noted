import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(
  name: string,
  emailAddress: string,
  passwordHash: string,
  res: NextApiResponse
): Promise<void> {
  const existingUser = await prisma.user.findUnique({ where: { email: emailAddress } });
  let user;
  if (!existingUser) {
    try {
      user = await prisma.user.create({
        data: { name, email: emailAddress, passwordHash }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return res.status(400).json({ message: e.message });
        }
        return res.status(400).json({ message: e.message });
      }
    }
  } else {
    return res.status(400).json({ message: 'User already exists' });
  }
  return res.status(201).json({ user });
}

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { confirmPassword } = req.body;

  try {
    const errors = [];

    if (password.length < 6) {
      errors.push('password length should be more than 6 characters');
      return res.status(400).json({ errors });
    }

    if (password === confirmPassword) {
      const passwordHash: string = hashPassword(password);
      await registerUser(name, email, passwordHash, res);
    } else {
      errors.push('passwords do not match');
      console.error();
      return res.status(400).json({ errors });
    }
  } catch (e) {
    console.error('error', e);
  }

  return NextResponse.json({ email, name, password });
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return res.status(400).json('GET STUFFS');
}

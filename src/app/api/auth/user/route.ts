import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function registerUser(name: string, email: string, passwordHash: string, res: { status: any }): Promise<void> {
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
export async function POST(
  req: Request,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { errors: string[] }): any; new (): any } } }
) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') as string;
  const email = searchParams.get('email') as string;
  const password = searchParams.get('password') as string;
  const confirmPassword = searchParams.get('confirmPassword') as string;
  const passwordHash = hashPassword(password);

  try {
    const errors = [];

    if (password.length < 6) {
      errors.push('password length should be more than 6 characters');
      return res.status(400).json({ errors });
    }

    if (password === confirmPassword) {
      await registerUser(name, email, passwordHash, res);
    } else {
      errors.push('passwords do not match');
      console.error();
      return res.status(400).json({ errors });
    }
  } catch (e) {
    console.error('error', e);
  }

  return NextResponse.json({ email, name, password, confirmPassword, passwordHash });
}

export async function GET(
  req: Request,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: string): any; new (): any } } }
) {
  return res.status(400).json('GET STUFFS');
}

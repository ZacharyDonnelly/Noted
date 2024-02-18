import { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { text } from 'stream/consumers';

// const limiter = rateLimit({
//   interval: INTERVAL,
//   uniqueTokenPerInterval: UNIQUE_TOKEN_PER_INTERVAL
// });

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse): Promise<Response> {
  const body = await text(req.body);
  const data = JSON.parse(body);
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(data.password, salt) as string;

  if (data.password.length < 6) {
    return Response.json({ message: 'Password is not at least 6 characters' }, { status: 400 });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 401 });
    }

    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, password: passwordHash }
    });

    return NextResponse.json({ name: user.name, email: user.email }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: `Prisma error P2002! - ${error.message}` }, { status: 400 });
      }
      return NextResponse.json({ message: `Prisma error - ${error.message}` }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating user', error }, { status: 400 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse<number>> {
  return res.status(400);
}

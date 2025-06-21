// src/app/api/chat/get-messages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
  }

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { timestamp: 'asc' }, // oldest first
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

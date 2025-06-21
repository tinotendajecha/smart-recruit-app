// src/app/api/chat/save-message/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, sender, content } = body;

    if (!userId || !sender || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        userId,
        sender,
        content,
      },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error saving chat message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

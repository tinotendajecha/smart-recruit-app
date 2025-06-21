// app/api/job-application/update-stage/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { applicationID, stage } = body;

    if (!applicationID || !stage) {
      return NextResponse.json(
        { error: 'applicationID and stage are required' },
        { status: 400 }
      );
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id: applicationID },
      data: { stage },
    });

    return NextResponse.json(
      { message: 'Stage updated successfully', updatedApplication },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating stage:', error);
    return NextResponse.json(
      { error: 'Failed to update stage' },
      { status: 500 }
    );
  }
}

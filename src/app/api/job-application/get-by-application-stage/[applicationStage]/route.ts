// app/api/job-application/get/[applicationStage]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/dbconfig';

export async function GET(
  req: NextRequest,
  { params }: { params: { applicationStage: string } }
) {
  try {
    const { applicationStage } = params;

    if (!applicationStage) {
      return NextResponse.json(
        { error: 'Application stage is required in the URL' },
        { status: 400 }
      );
    }

    const applications = await prisma.jobApplication.findMany({
      where: {
        stage: applicationStage,
      },
      include: {
        user: true,
        job: true,
        // company: true,
      },
      orderBy: {
        appliedAt: 'desc',
      },
    });

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job applications' },
      { status: 500 }
    );
  }
}

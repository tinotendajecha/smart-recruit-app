import prisma from '@/utils/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { companyName: string } }
) {
  const { companyName } = params;

  try {
    if (!companyName) {
      return NextResponse.json({ error: 'Missing company name' }, { status: 400 });
    }

    const company = await prisma.company.findFirst({
      where: {
        company_name: {
          equals: companyName,
          mode: 'insensitive', // case-insensitive search
        },
      },
      include: {
        Job: true, // include related jobs if needed
        JobApplications: true, // include related applications
        Company_User: true, // optional: remove if not needed
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({ data: company });
  } catch (error) {
    console.error('Error fetching company by name:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

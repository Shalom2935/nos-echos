import { NextResponse } from 'next/server';
import type { CreateTestimonyDTO } from '@/types/testimony';
import { TestimonyService } from '@/app/services/testimony.service';

export async function POST(request: Request) {
  try {
    const body: CreateTestimonyDTO = await request.json();

    // TODO: Add validation
    if (!body.type || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const testimony = await TestimonyService.create(body);
    return NextResponse.json(testimony, { status: 201 });
  } catch (error) {
    console.error('Error creating testimony:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const testimonies = await TestimonyService.findAll();
    return NextResponse.json(testimonies);
  } catch (error) {
    console.error('Error fetching testimonies:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
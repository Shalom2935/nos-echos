import { NextResponse } from 'next/server';
import { TestimonyService } from '@/app/services/testimony.service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const testimony = await TestimonyService.findById(id);

    if (!testimony) {
      return NextResponse.json(
        { error: 'Testimony not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(testimony);
  } catch (error) {
    console.error('Error fetching testimony:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const testimony = await TestimonyService.update(id, status);

    if (!testimony) {
      return NextResponse.json(
        { error: 'Testimony not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(testimony);
  } catch (error) {
    console.error('Error updating testimony:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = await TestimonyService.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Testimony not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Testimony deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimony:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
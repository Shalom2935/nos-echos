import type { CreateTestimonyDTO, Testimony } from '@/types/testimony';

export class TestimonyService {
  // TODO: Add database integration
  private static testimonies: Testimony[] = [];

  static async create(data: CreateTestimonyDTO): Promise<Testimony> {
    const testimony: Testimony = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      status: 'pending'
    };

    this.testimonies.push(testimony);
    return testimony;
  }

  static async findAll(): Promise<Testimony[]> {
    return this.testimonies.filter(t => t.status === 'approved');
  }

  static async findById(id: string): Promise<Testimony | null> {
    return this.testimonies.find(t => t.id === id) || null;
  }

  static async update(id: string, status: 'approved' | 'rejected'): Promise<Testimony | null> {
    const testimony = await this.findById(id);
    if (!testimony) return null;

    testimony.status = status;
    return testimony;
  }

  static async delete(id: string): Promise<boolean> {
    const index = this.testimonies.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.testimonies.splice(index, 1);
    return true;
  }
} 
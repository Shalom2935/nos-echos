import { TestimonyService } from '@/app/services/testimony.service';
import type { CreateTestimonyDTO } from '@/types/testimony';

describe('TestimonyService', () => {
  const mockTestimony: CreateTestimonyDTO = {
    type: 'survivor',
    gender: 'female',
    age: '25-34',
    location: {
      region: 'Douala',
      city: 'Douala',
      district: 'Akwa'
    },
    content: 'Test testimony content'
  };

  beforeEach(() => {
    // Reset the testimonies array before each test
    (TestimonyService as any).testimonies = [];
  });

  it('creates a new testimony', async () => {
    const testimony = await TestimonyService.create(mockTestimony);
    expect(testimony).toHaveProperty('id');
    expect(testimony.status).toBe('pending');
    expect(testimony.content).toBe(mockTestimony.content);
  });

  it('finds all approved testimonies', async () => {
    await TestimonyService.create(mockTestimony);
    await TestimonyService.create({
      ...mockTestimony,
      content: 'Another testimony'
    });

    const testimonies = await TestimonyService.findAll();
    expect(testimonies).toHaveLength(0); // All are pending initially
  });

  it('finds testimony by id', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const found = await TestimonyService.findById(created.id);
    expect(found).toHaveProperty('id', created.id);
  });

  it('updates testimony status', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const updated = await TestimonyService.update(created.id, 'approved');
    expect(updated?.status).toBe('approved');
  });

  it('deletes testimony', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const success = await TestimonyService.delete(created.id);
    expect(success).toBe(true);

    const found = await TestimonyService.findById(created.id);
    expect(found).toBeNull();
  });

  it('returns null when finding non-existent testimony', async () => {
    const found = await TestimonyService.findById('non-existent');
    expect(found).toBeNull();
  });

  it('returns false when deleting non-existent testimony', async () => {
    const success = await TestimonyService.delete('non-existent');
    expect(success).toBe(false);
  });
}); 
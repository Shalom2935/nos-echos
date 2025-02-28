import { server } from '../../mocks/server';
import { rest } from 'msw';
import { TestimonyService } from '@/app/services/testimony.service';

describe('Testimony API Endpoints', () => {
  const mockTestimony = {
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

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch all testimonies', async () => {
    const testimonies = await TestimonyService.findAll();
    expect(Array.isArray(testimonies)).toBe(true);
    expect(testimonies.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new testimony', async () => {
    const testimony = await TestimonyService.create(mockTestimony);
    expect(testimony).toHaveProperty('id');
    expect(testimony.content).toBe(mockTestimony.content);
    expect(testimony.status).toBe('pending');
  });

  it('should fetch a testimony by id', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const testimony = await TestimonyService.findById(created.id);
    expect(testimony).toHaveProperty('id', created.id);
  });

  it('should update testimony status', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const updated = await TestimonyService.update(created.id, 'approved');
    expect(updated?.status).toBe('approved');
  });

  it('should delete a testimony', async () => {
    const created = await TestimonyService.create(mockTestimony);
    const success = await TestimonyService.delete(created.id);
    expect(success).toBe(true);

    const found = await TestimonyService.findById(created.id);
    expect(found).toBeNull();
  });

  it('should handle non-existent testimony', async () => {
    const found = await TestimonyService.findById('non-existent');
    expect(found).toBeNull();
  });

  it('should handle server errors', async () => {
    server.use(
      rest.get('/api/testimonies', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );

    await expect(TestimonyService.findAll()).rejects.toThrow();
  });
}); 
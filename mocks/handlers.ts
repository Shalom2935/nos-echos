import { rest } from 'msw';
import type { Testimony } from '@/types/testimony';

const mockTestimonies: Testimony[] = [
  {
    id: '1',
    type: 'survivor',
    gender: 'female',
    age: '25-34',
    location: {
      region: 'Douala',
      city: 'Douala',
      district: 'Akwa'
    },
    content: 'Test testimony content',
    createdAt: new Date(),
    status: 'approved'
  }
];

export const handlers = [
  // GET /api/testimonies
  rest.get('/api/testimonies', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockTestimonies)
    );
  }),

  // GET /api/testimonies/:id
  rest.get('/api/testimonies/:id', (req, res, ctx) => {
    const { id } = req.params;
    const testimony = mockTestimonies.find(t => t.id === id);
    
    if (!testimony) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Testimony not found' })
      );
    }

    return res(ctx.json(testimony));
  }),

  // POST /api/testimonies
  rest.post('/api/testimonies', async (req, res, ctx) => {
    const body = await req.json();
    const newTestimony: Testimony = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date(),
      status: 'pending'
    };

    return res(
      ctx.status(201),
      ctx.json(newTestimony)
    );
  }),

  // PATCH /api/testimonies/:id
  rest.patch('/api/testimonies/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const testimony = mockTestimonies.find(t => t.id === id);
    
    if (!testimony) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Testimony not found' })
      );
    }

    const body = await req.json();
    const updated = { ...testimony, ...body };

    return res(ctx.json(updated));
  }),

  // DELETE /api/testimonies/:id
  rest.delete('/api/testimonies/:id', (req, res, ctx) => {
    const { id } = req.params;
    const testimonyIndex = mockTestimonies.findIndex(t => t.id === id);
    
    if (testimonyIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Testimony not found' })
      );
    }

    return res(
      ctx.json({ message: 'Testimony deleted successfully' })
    );
  })
]; 
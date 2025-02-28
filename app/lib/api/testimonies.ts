import type { CreateTestimonyDTO, Testimony } from '@/types/testimony';
import api from '../axios';

export const testimoniesApi = {
  getAll: async (): Promise<Testimony[]> => {
    return api.get('/testimonies');
  },

  getById: async (id: string): Promise<Testimony> => {
    return api.get(`/testimonies/${id}`);
  },

  create: async (data: CreateTestimonyDTO): Promise<Testimony> => {
    return api.post('/testimonies', data);
  },

  update: async (id: string, status: 'approved' | 'rejected'): Promise<Testimony> => {
    return api.patch(`/testimonies/${id}`, { status });
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/testimonies/${id}`);
  },
}; 
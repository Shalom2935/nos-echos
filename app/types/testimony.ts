export type Testimony = {
  id: string
  type: 'survivor' | 'witness'
  gender: 'male' | 'female' | 'other'
  age: '18-24' | '25-34' | '35-44' | '45+'
  content: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
} 
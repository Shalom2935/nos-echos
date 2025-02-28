export type TestimonyType = 'victim' | 'survivor' | 'witness';
export type Gender = 'male' | 'female' | 'other';
export type AgeRange = 'under18' | '18-24' | '25-34' | '35-44' | '45plus';

export interface Location {
  region: string;
  city: string;
  district: string;
}

export interface Testimony {
  id: string;
  type: TestimonyType;
  gender: Gender;
  age: AgeRange;
  location: Location;
  content: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CreateTestimonyDTO {
  type: TestimonyType;
  gender: Gender;
  age: AgeRange;
  location: Location;
  content: string;
} 
export interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  senderId: number;
  receiverId: number;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  author: Author;
  content: string;
}

export interface TestimonialStats {
  likes: number;
  comments: number;
  views: number;
}

export interface Testimonial {
  id: number;
  author: Author;
  content: string;
  stats: TestimonialStats;
  comments: Comment[];
  status: 'published' | 'pending' | 'rejected';
}
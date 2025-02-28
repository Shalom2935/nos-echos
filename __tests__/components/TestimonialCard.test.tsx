import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialCard from '@/app/components/testimonials/TestimonialCard';

const mockProps = {
  author: {
    name: 'Test User',
    role: 'Survivor',
    avatar: 'test-avatar.jpg'
  },
  content: 'Test testimony content',
  stats: {
    likes: 5,
    comments: 2
  },
  comments: [
    {
      author: 'Commenter',
      role: 'User',
      content: 'Test comment'
    }
  ],
  showComments: false,
  onToggleComments: jest.fn()
};

describe('TestimonialCard', () => {
  it('renders the testimony content', () => {
    render(<TestimonialCard {...mockProps} />);
    expect(screen.getByText('Test testimony content')).toBeInTheDocument();
  });

  it('displays author information', () => {
    render(<TestimonialCard {...mockProps} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Survivor')).toBeInTheDocument();
  });

  it('shows stats correctly', () => {
    render(<TestimonialCard {...mockProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('toggles comments when clicked', () => {
    render(<TestimonialCard {...mockProps} />);
    const commentsButton = screen.getByRole('button', {
      name: (content) => content.includes('2')
    });
    fireEvent.click(commentsButton);
    expect(mockProps.onToggleComments).toHaveBeenCalled();
  });

  it('shows comments when showComments is true', () => {
    render(<TestimonialCard {...mockProps} showComments={true} />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });
}); 
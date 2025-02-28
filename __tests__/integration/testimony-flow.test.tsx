import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestimonyForm from '@/app/components/testimonials/TestimonyForm';
import TestimonialList from '@/app/components/testimonials/TestimonialList';
import { TestimonyService } from '@/app/services/testimony.service';

jest.mock('@/app/services/testimony.service');

describe('Testimony Flow Integration', () => {
  const mockTestimony = {
    type: 'survivor',
    gender: 'female',
    age: '25-34',
    location: {
      region: 'Douala',
      city: 'Douala',
      district: 'Akwa'
    },
    content: 'Integration test testimony content'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit testimony and display in list', async () => {
    const user = userEvent.setup();
    
    // Mock service calls
    (TestimonyService.create as jest.Mock).mockResolvedValue({
      ...mockTestimony,
      id: '123',
      status: 'pending',
      createdAt: new Date()
    });
    
    (TestimonyService.findAll as jest.Mock).mockResolvedValue([
      {
        ...mockTestimony,
        id: '123',
        status: 'approved',
        createdAt: new Date()
      }
    ]);

    // Render both components
    render(
      <>
        <TestimonyForm />
        <TestimonialList />
      </>
    );

    // Fill and submit form
    await user.selectOptions(screen.getByLabelText(/type/i), 'survivor');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'female');
    await user.selectOptions(screen.getByLabelText(/age/i), '25-34');
    await user.type(screen.getByLabelText(/content/i), mockTestimony.content);
    
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify form submission
    await waitFor(() => {
      expect(TestimonyService.create).toHaveBeenCalledWith(expect.objectContaining({
        content: mockTestimony.content
      }));
    });

    // Verify list update
    await waitFor(() => {
      expect(screen.getByText(mockTestimony.content)).toBeInTheDocument();
    });
  });

  it('should handle form validation errors', async () => {
    const user = userEvent.setup();
    render(<TestimonyForm />);

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify validation messages
    await waitFor(() => {
      expect(screen.getByText(/type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/content is required/i)).toBeInTheDocument();
    });
  });

  it('should handle server errors gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock service error
    (TestimonyService.create as jest.Mock).mockRejectedValue(new Error('Server error'));

    render(<TestimonyForm />);

    // Fill and submit form
    await user.selectOptions(screen.getByLabelText(/type/i), 'survivor');
    await user.type(screen.getByLabelText(/content/i), mockTestimony.content);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/error submitting testimony/i)).toBeInTheDocument();
    });
  });
}); 
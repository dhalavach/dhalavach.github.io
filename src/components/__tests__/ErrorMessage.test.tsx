import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '../ErrorMessage';

const mockOnRetry = vi.fn();

describe('ErrorMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('displays error message correctly', () => {
      const errorMessage = 'Failed to fetch data';

      render(<ErrorMessage message={errorMessage} onRetry={mockOnRetry} />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders retry button', () => {
      render(<ErrorMessage message="Error occurred" onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('displays error icon', () => {
      render(<ErrorMessage message="Error occurred" onRetry={mockOnRetry} />);

      // The AlertCircle icon should be present
      const errorIcon = screen.getByRole('img', { hidden: true });
      expect(errorIcon).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
      render(<ErrorMessage message="Error occurred" onRetry={mockOnRetry} />);

      const container = screen.getByText('Something went wrong').closest('div');
      expect(container).toHaveClass(
        'bg-red-50',
        'border',
        'border-red-200',
        'rounded-lg'
      );
    });
  });

  describe('User Interaction Tests', () => {
    it('calls onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();

      render(<ErrorMessage message="Error occurred" onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: /try again/i });
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('retry button has correct styling on hover', () => {
      render(<ErrorMessage message="Error occurred" onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toHaveClass('hover:bg-red-700');
    });
  });

  describe('Error Display Tests', () => {
    it('handles long error messages', () => {
      const longMessage =
        'This is a very long error message that should still be displayed correctly without breaking the layout or causing any issues with the component rendering';

      render(<ErrorMessage message={longMessage} onRetry={mockOnRetry} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles empty error message', () => {
      render(<ErrorMessage message="" onRetry={mockOnRetry} />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      // Empty message should still render without breaking
      expect(
        screen.getByRole('button', { name: /try again/i })
      ).toBeInTheDocument();
    });

    it('handles special characters in error message', () => {
      const specialMessage = 'Error: HTTP 404 - Resource not found! @#$%^&*()';

      render(<ErrorMessage message={specialMessage} onRetry={mockOnRetry} />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});

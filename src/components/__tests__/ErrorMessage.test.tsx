import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '../ErrorMessage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ErrorMessage', () => {
  const defaultProps = {
    message: 'Something went wrong',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('displays error message correctly', () => {
      render(<ErrorMessage {...defaultProps} />);

      expect(screen.getAllByText('Something went wrong')).not.toHaveLength(0);
    });

  
    it('displays error title', () => {
      render(<ErrorMessage {...defaultProps} />);

      expect(screen.getAllByText('Something went wrong')).not.toHaveLength(0);
    });

    it('renders retry button when onRetry prop is provided', () => {
      const mockOnRetry = vi.fn();
      render(<ErrorMessage {...defaultProps} onRetry={mockOnRetry} />);

      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument();
    });

    it('does not render retry button when onRetry prop is not provided', () => {
      render(<ErrorMessage {...defaultProps} />);

      expect(
        screen.queryByRole('button', { name: 'Try Again' })
      ).not.toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('calls onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnRetry = vi.fn();
      render(<ErrorMessage {...defaultProps} onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks on retry button', async () => {
      const user = userEvent.setup();
      const mockOnRetry = vi.fn();
      render(<ErrorMessage {...defaultProps} onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);
      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(2);
    });
  });

  describe('Message Display Tests', () => {
    it('displays custom error messages', () => {
      const customMessage = 'Network connection failed';
      render(<ErrorMessage message={customMessage} />);

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('displays long error messages correctly', () => {
      const longMessage =
        'This is a very long error message that should be displayed correctly even when it contains multiple sentences and detailed information about what went wrong.';
      render(<ErrorMessage message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles empty error message', () => {
      render(<ErrorMessage message="" />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Styling Tests', () => {
    it('applies correct CSS classes', () => {
      const { container } = render(<ErrorMessage {...defaultProps} />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'justify-center'
      );
    });

    it('applies correct button styling when retry is available', () => {
      const mockOnRetry = vi.fn();
      render(<ErrorMessage {...defaultProps} onRetry={mockOnRetry} />);

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      expect(retryButton).toHaveClass(
        'bg-blue-600',
        'text-white',
        'px-6',
        'py-2',
        'rounded-md'
      );
    });
  });
});

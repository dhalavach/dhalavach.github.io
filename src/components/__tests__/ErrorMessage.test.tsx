import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOnRetry = vi.fn();

describe('ErrorMessage', () => {
  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it('renders error message correctly', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('displays error icon', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    const errorIcon = screen.getByRole('img', { hidden: true });
    expect(errorIcon).toBeInTheDocument();
  });

  it('has correct styling for error state', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    const errorContainer = screen
      .getByText('Network error occurred')
      .closest('div');
    expect(errorContainer).toHaveClass('bg-red-50', 'border-red-200');
  });

  it('retry button has correct styling', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toHaveClass(
      'bg-red-600',
      'text-white',
      'hover:bg-red-700'
    );
  });

  it('displays refresh icon in retry button', () => {
    render(
      <ErrorMessage message="Network error occurred" onRetry={mockOnRetry} />
    );

    const refreshIcon = screen.getAllByRole('img', { hidden: true })[1]; // Second icon is the refresh icon
    expect(refreshIcon).toBeInTheDocument();
  });

  it('handles long error messages', () => {
    const longMessage =
      'This is a very long error message that should still be displayed correctly in the error component without breaking the layout or causing any issues with the user interface.';

    render(<ErrorMessage message={longMessage} onRetry={mockOnRetry} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('handles empty error message', () => {
    render(<ErrorMessage message="" onRetry={mockOnRetry} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});

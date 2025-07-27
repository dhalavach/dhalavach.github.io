import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import { describe, expect, it } from 'vitest';

describe('LoadingSpinner', () => {
  it('renders loading spinner with correct text', () => {
    render(<LoadingSpinner />);

    expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
  });

  it('renders loading icon', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('img', { hidden: true });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('has correct styling classes', () => {
    const { container } = render(<LoadingSpinner />);

    const spinnerContainer = container.firstChild;
    expect(spinnerContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'py-12'
    );
  });

  it('displays correct loading message', () => {
    render(<LoadingSpinner />);

    const message = screen.getByText('Searching the galaxy...');
    expect(message).toHaveClass('text-gray-600');
  });
});

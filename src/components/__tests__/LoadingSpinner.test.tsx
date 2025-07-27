import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  describe('Rendering Tests', () => {
    it('renders loading indicator (spinner)', () => {
      render(<LoadingSpinner />);

      // Check for the spinner icon
      const spinner = screen.getByRole('status', { hidden: true });
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('displays loading text', () => {
      render(<LoadingSpinner />);

      expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
      render(<LoadingSpinner />);

      const container = screen
        .getByText('Searching the galaxy...')
        .closest('div');
      expect(container).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'py-12'
      );
    });

    it('spinner has correct color and size classes', () => {
      render(<LoadingSpinner />);

      const spinner = screen.getByRole('status', { hidden: true });
      expect(spinner).toHaveClass(
        'w-8',
        'h-8',
        'animate-spin',
        'text-blue-600'
      );
    });
  });

  describe('Accessibility Tests', () => {
    it('has appropriate role for screen readers', () => {
      render(<LoadingSpinner />);

      const spinner = screen.getByRole('status', { hidden: true });
      expect(spinner).toBeInTheDocument();
    });

    it('provides meaningful text for screen readers', () => {
      render(<LoadingSpinner />);

      expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
    });
  });
});

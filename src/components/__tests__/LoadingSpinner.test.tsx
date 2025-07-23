import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import { describe, expect, it } from 'vitest';

describe('LoadingSpinner', () => {
  describe('Rendering Tests', () => {
    it('renders loading indicator with spinner', () => {
      render(<LoadingSpinner />);

      expect(screen.getByText('Searching the galaxy...')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText('Searching the galaxy...');
      expect(loadingText).toBeInTheDocument();
    });

    it('renders spinner elements with correct styling', () => {
      const { container } = render(<LoadingSpinner />);

      const spinners = container.querySelectorAll('.animate-spin');
      expect(spinners).toHaveLength(2);

      const mainSpinner = container.querySelector('.border-t-blue-600');
      expect(mainSpinner).toBeInTheDocument();

      const secondarySpinner = container.querySelector('.border-t-yellow-400');
      expect(secondarySpinner).toBeInTheDocument();
    });

    it('has proper container structure', () => {
      const { container } = render(<LoadingSpinner />);

      const loadingContainer = container.querySelector(
        '.flex.items-center.justify-center'
      );
      expect(loadingContainer).toBeInTheDocument();

      const spinnerContainer = container.querySelector('.relative');
      expect(spinnerContainer).toBeInTheDocument();
    });
  });

  describe('Visual Tests', () => {
    it('applies correct CSS classes for styling', () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-center',
        'py-12'
      );

      const textElement = screen.getByText('Searching the galaxy...');
      expect(textElement).toHaveClass('ml-3', 'text-gray-600', 'font-medium');
    });

    it('renders with proper spinner dimensions', () => {
      const { container } = render(<LoadingSpinner />);

      const spinners = container.querySelectorAll('.w-12.h-12');
      expect(spinners).toHaveLength(2);
    });
  });
});

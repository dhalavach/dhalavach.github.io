import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Component with a button that throws an error when clicked
const ErrorButton = () => {
  const throwError = () => {
    throw new Error('Button click error');
  };

  return (
    <button onClick={throwError} data-testid="error-button">
      Throw Error
    </button>
  );
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Error Catching Tests', () => {
    it('catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /try again/i })
      ).toBeInTheDocument();
      expect(screen.queryByText('No error')).not.toBeInTheDocument();
    });

    it('logs error to console', () => {
      const consoleSpy = vi.spyOn(console, 'error');

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('renders children normally when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
      expect(
        screen.queryByText('Something went wrong')
      ).not.toBeInTheDocument();
    });

    it('displays generic error message when error has no message', () => {
      const ErrorWithoutMessage = () => {
        throw new Error();
      };

      render(
        <ErrorBoundary>
          <ErrorWithoutMessage />
        </ErrorBoundary>
      );

      expect(
        screen.getByText('An unexpected error occurred')
      ).toBeInTheDocument();
    });
  });

  describe('Error Button Tests', () => {
    it('throws error when test button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      const errorButton = screen.getByTestId('error-button');
      await user.click(errorButton);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Button click error')).toBeInTheDocument();
    });

    it('triggers error boundary fallback UI after button click', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      // Initially, the error button should be visible
      expect(screen.getByTestId('error-button')).toBeInTheDocument();

      const errorButton = screen.getByTestId('error-button');
      await user.click(errorButton);

      // After error, fallback UI should be shown
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();
    });
  });

  describe('Reset Functionality', () => {
    it('resets error state when try again button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Error should be displayed
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      const tryAgainButton = screen.getByRole('button', { name: /try again/i });
      await user.click(tryAgainButton);

      // After reset, the component should try to render children again
      // Since ThrowError still throws, it should show error again
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('has correct styling for error boundary UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const container = screen.getByText('Something went wrong').closest('div');
      expect(container).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg');
    });

    it('displays error icon in fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // The AlertTriangle icon should be present
      const errorIcon = screen.getByRole('img', { hidden: true });
      expect(errorIcon).toBeInTheDocument();
    });
  });
});

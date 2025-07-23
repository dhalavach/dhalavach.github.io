import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../ErrorBoundary';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Error Catching Tests', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByText('No error')).not.toBeInTheDocument();
    });

    it('displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText(
          'The application encountered an unexpected error. Please refresh the page to try again.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Refresh Page' })
      ).toBeInTheDocument();
    });

    it('logs error to console', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('Error UI Tests', () => {

    it('displays error details when available', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Error Details')).toBeInTheDocument();
    });

    it('shows error message in details section', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const details = screen.getByRole('group');
      expect(details).toBeInTheDocument();
    });
  });

  describe('Refresh Functionality Tests', () => {
    it('calls window.location.reload when refresh button is clicked', async () => {
      const user = userEvent.setup();
      const reloadSpy = vi
        .spyOn(window.location, 'reload')
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByRole('button', {
        name: 'Refresh Page',
      });
      await user.click(refreshButton);

      expect(reloadSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling Tests', () => {
    it('applies correct styling classes', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorContainer = container.firstChild as HTMLElement;
      expect(errorContainer).toHaveClass(
        'min-h-screen',
        'bg-gray-900',
        'flex',
        'items-center',
        'justify-center'
      );
    });

    it('applies correct button styling', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByRole('button', {
        name: 'Refresh Page',
      });
      expect(refreshButton).toHaveClass(
        'bg-blue-600',
        'text-white',
        'px-6',
        'py-2',
        'rounded-md'
      );
    });
  });

  describe('Error State Management', () => {
    it('maintains error state after error occurs', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});

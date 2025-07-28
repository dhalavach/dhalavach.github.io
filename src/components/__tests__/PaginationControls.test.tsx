import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationControls } from '../PaginationControls';

const mockOnPageChange = vi.fn();

describe('PaginationControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders pagination controls when there are multiple pages', () => {
      const pagination = {
        currentPage: 1,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('does not render when there is only one page', () => {
      const pagination = {
        currentPage: 1,
        totalPages: 1,
        totalCount: 5,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('highlights current page', () => {
      const pagination = {
        currentPage: 2,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const currentPageButton = screen.getByText('2');
      expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white');
    });

    it('disables Previous button on first page', () => {
      const pagination = {
        currentPage: 1,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      const pagination = {
        currentPage: 3,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('disables all buttons when loading', () => {
      const pagination = {
        currentPage: 2,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={true}
        />
      );

      expect(screen.getByText('Previous')).toBeDisabled();
      expect(screen.getByText('Next')).toBeDisabled();
      expect(screen.getByText('1')).toBeDisabled();
      expect(screen.getByText('2')).toBeDisabled();
      expect(screen.getByText('3')).toBeDisabled();
    });
  });

  describe('User Interaction Tests', () => {
    it('calls onPageChange when page number is clicked', async () => {
      const user = userEvent.setup();
      const pagination = {
        currentPage: 1,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const pageButton = screen.getByText('2');
      await user.click(pageButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when Previous button is clicked', async () => {
      const user = userEvent.setup();
      const pagination = {
        currentPage: 2,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const previousButton = screen.getByText('Previous');
      await user.click(previousButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange when Next button is clicked', async () => {
      const user = userEvent.setup();
      const pagination = {
        currentPage: 1,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('does not call onPageChange when current page is clicked', async () => {
      const user = userEvent.setup();
      const pagination = {
        currentPage: 2,
        totalPages: 3,
        totalCount: 30,
      };

      render(
        <PaginationControls
          pagination={pagination}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      );

      const currentPageButton = screen.getByText('2');
      await user.click(currentPageButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });
});

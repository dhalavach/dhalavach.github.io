import { render, screen } from '@testing-library/react';
import { About } from '../About';
import { describe, expect, it } from 'vitest';

describe('About', () => {
  it('renders creator information', () => {
    render(<About />);

    expect(screen.getByText('Created by yours truly')).toBeInTheDocument();
  });

  it('displays current year', () => {
    render(<About />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  it('renders RS School link with correct attributes', () => {
    render(<About />);

    const link = screen.getByText('RS School React Course');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
    expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays heart icon', () => {
    render(<About />);

    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    const { container } = render(<About />);

    const aboutContainer = container.firstChild;
    expect(aboutContainer).toHaveClass(
      'bg-white',
      'border-t',
      'border-gray-200',
      'py-8'
    );
  });

  it('link has hover styles', () => {
    render(<About />);

    const link = screen.getByText('RS School React Course').closest('a');
    expect(link).toHaveClass(
      'text-blue-600',
      'hover:text-blue-800',
      'transition-colors'
    );
  });
});

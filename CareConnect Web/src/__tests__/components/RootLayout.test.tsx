import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RootLayout } from '../../components/RootLayout';

describe('RootLayout', () => {
  it('should render the layout container', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );
    const container = document.querySelector('.min-h-screen.bg-gray-100');
    expect(container).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('should render image with src', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('should show fallback on error', () => {
    render(<ImageWithFallback src="bad-url.jpg" alt="Broken image" />);
    const img = screen.getByAltText('Broken image');

    fireEvent.error(img);

    const errorImg = screen.getByAltText('Error loading image');
    expect(errorImg).toBeInTheDocument();
    expect(errorImg).toHaveAttribute('data-original-url', 'bad-url.jpg');
  });

  it('should pass className to image', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test cls" className="my-class" />);
    const img = screen.getByAltText('Test cls');
    expect(img).toHaveClass('my-class');
  });

  it('should pass style to image', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test style" style={{ width: 100 }} />);
    const img = screen.getByAltText('Test style');
    expect(img).toHaveStyle({ width: '100px' });
  });

  it('should pass className to fallback container', () => {
    render(<ImageWithFallback src="bad.jpg" alt="Bad img" className="fallback-class" />);
    const img = screen.getByAltText('Bad img');
    fireEvent.error(img);

    const container = screen.getByAltText('Error loading image').closest('.fallback-class');
    expect(container).toBeInTheDocument();
  });
});

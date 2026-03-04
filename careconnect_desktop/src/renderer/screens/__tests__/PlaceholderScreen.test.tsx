import { render, screen } from '@testing-library/react';
import PlaceholderScreen from '../PlaceholderScreen';

describe('PlaceholderScreen', () => {
  it('renders the given title', () => {
    render(<PlaceholderScreen title="Test Page" />);
    expect(screen.getByRole('heading', { name: /test page/i })).toBeInTheDocument();
  });

  it('renders the coming soon message', () => {
    render(<PlaceholderScreen title="Anything" />);
    expect(screen.getByText(/this screen is coming soon/i)).toBeInTheDocument();
  });

  it('uses dashboard-screen class', () => {
    const { container } = render(<PlaceholderScreen title="Foo" />);
    const wrapper = container.querySelector('.dashboard-screen');
    expect(wrapper).toBeInTheDocument();
  });
});

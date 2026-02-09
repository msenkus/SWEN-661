import React from 'react';
import { render,} from '@testing-library/react-native';
import SOSConfirmation from '../../screens/SOSConfirmation';

jest.useFakeTimers();

describe('SOSConfirmation', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<SOSConfirmation onNavigate={mockNavigate} />);

  it('renders emergency warning content', () => {
    const { getByText } = renderScreen();

    expect(getByText('Emergency Assistance')).toBeTruthy();
    expect(
      getByText(/slide to immediately call emergency services/i)
    ).toBeTruthy();
  });

  it('renders slide instruction text', () => {
    const { getByText } = renderScreen();

    expect(
      getByText('Slide to Call Emergency Services')
    ).toBeTruthy();
  });

});

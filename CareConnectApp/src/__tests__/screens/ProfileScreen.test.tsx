import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../../screens/ProfileScreen';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    Activity: (props: any) => <Text>Activity</Text>,
    Droplets: (props: any) => <Text>Droplets</Text>,
    Phone: (props: any) => <Text>Phone</Text>,
    LogOut: (props: any) => <Text>LogOut</Text>,
    Edit2: (props: any) => <Text>Edit2</Text>,
    ShieldAlert: (props: any) => <Text>ShieldAlert</Text>,
    HeartPulse: (props: any) => <Text>HeartPulse</Text>,
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
  };
});

describe('ProfileScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<ProfileScreen onNavigate={mockNavigate} />);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the profile title', () => {
    const { getByText } = renderScreen();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('renders patient name', () => {
    const { getByText } = renderScreen();
    expect(getByText('Eleanor Rigby')).toBeTruthy();
  });

  it('renders patient vital information', () => {
    const { getByText } = renderScreen();
    expect(getByText('O+')).toBeTruthy();
    expect(getByText('78')).toBeTruthy();
  });

  it('renders medical conditions', () => {
    const { getByText } = renderScreen();
    expect(getByText('Hypertension (High Blood Pressure)')).toBeTruthy();
    expect(getByText('Type 2 Diabetes')).toBeTruthy();
  });

  it('renders allergies', () => {
    const { getByText } = renderScreen();
    expect(getByText('Penicillin')).toBeTruthy();
    expect(getByText('Peanuts')).toBeTruthy();
    expect(getByText('Shellfish')).toBeTruthy();
  });

  it('renders emergency contacts', () => {
    const { getByText } = renderScreen();
    expect(getByText('Father McKenzie')).toBeTruthy();
    expect(getByText('Sarah Rigby')).toBeTruthy();
  });

  it('navigates back to dashboard when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });
});

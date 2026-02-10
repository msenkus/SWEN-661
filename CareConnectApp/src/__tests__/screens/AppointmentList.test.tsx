import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppointmentList from '../../screens/AppointmentList';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    Calendar: (props: any) => <Text>Calendar</Text>,
    Clock: (props: any) => <Text>Clock</Text>,
    MapPin: (props: any) => <Text>MapPin</Text>,
    Video: (props: any) => <Text>Video</Text>,
    ChevronRight: (props: any) => <Text>ChevronRight</Text>,
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
  };
});

describe('AppointmentList', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<AppointmentList onNavigate={mockNavigate} />);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the appointments title', () => {
    const { getByText } = renderScreen();
    expect(getByText('Appointments')).toBeTruthy();
  });

  it('renders the appointment count', () => {
    const { getByText } = renderScreen();
    expect(getByText('Upcoming Appointments')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('renders filter tabs', () => {
    const { getByText } = renderScreen();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('Past')).toBeTruthy();
    expect(getByText('Canceled')).toBeTruthy();
  });

  it('renders appointment cards', () => {
    const { getByText } = renderScreen();
    expect(getByText('Dr. Sarah Johnson')).toBeTruthy();
    expect(getByText('Dr. Michael Chen')).toBeTruthy();
    expect(getByText('Physical Therapy')).toBeTruthy();
    expect(getByText('Lab Work')).toBeTruthy();
  });

  it('navigates to appointment detail when card is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Dr. Sarah Johnson'));
    expect(mockNavigate).toHaveBeenCalledWith('appointment-detail');
  });

  it('navigates back to dashboard when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });
});

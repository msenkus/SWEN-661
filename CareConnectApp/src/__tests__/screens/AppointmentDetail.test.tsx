import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppointmentDetail from '../../screens/AppointmentDetail';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    Calendar: (props: any) => <Text>Calendar</Text>,
    Clock: (props: any) => <Text>Clock</Text>,
    MapPin: (props: any) => <Text>MapPin</Text>,
    Phone: (props: any) => <Text>Phone</Text>,
    Mail: (props: any) => <Text>Mail</Text>,
    FileText: (props: any) => <Text>FileText</Text>,
    Navigation: (props: any) => <Text>Navigation</Text>,
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
  };
});

describe('AppointmentDetail', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<AppointmentDetail onNavigate={mockNavigate} />);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the appointment details title', () => {
    const { getByText } = renderScreen();
    expect(getByText('Appointment Details')).toBeTruthy();
  });

  it('renders doctor information', () => {
    const { getByText } = renderScreen();
    expect(getByText('Dr. Sarah Johnson')).toBeTruthy();
    expect(getByText('Primary Care Physician')).toBeTruthy();
  });

  it('renders date and time', () => {
    const { getByText } = renderScreen();
    expect(getByText('Today at 2:00 PM')).toBeTruthy();
    expect(getByText('30 min')).toBeTruthy();
  });

  it('renders location details', () => {
    const { getByText } = renderScreen();
    expect(getByText('Main Street Medical Center')).toBeTruthy();
    expect(getByText('123 Main Street, Suite 400')).toBeTruthy();
  });

  it('renders contact information', () => {
    const { getByText } = renderScreen();
    expect(getByText('(555) 123-4567')).toBeTruthy();
    expect(getByText('office@mainstreetmed.com')).toBeTruthy();
  });

  it('renders appointment notes', () => {
    const { getByText } = renderScreen();
    expect(getByText(/Annual physical examination/)).toBeTruthy();
    expect(getByText(/Medication review/)).toBeTruthy();
  });

  it('renders preparation tips', () => {
    const { getByText } = renderScreen();
    expect(getByText(/Bring your insurance card/)).toBeTruthy();
    expect(getByText(/Arrive 15 minutes early/)).toBeTruthy();
  });

  it('navigates back to appointments when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('appointments');
  });
});

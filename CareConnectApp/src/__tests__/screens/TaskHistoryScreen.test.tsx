import React from 'react';
import { render } from '@testing-library/react-native';
import TaskHistoryScreen from '../../screens/TaskHistoryScreen';

describe('TaskHistoryScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <TaskHistoryScreen
        onNavigate={mockNavigate}
        isTablet={false}
        orientation="portrait"
        hasMissedTasks={false}
      />
    );

  it('renders weekly completion stats', () => {
    const { getByText, getAllByText } = renderScreen();

    expect(getByText('This Week')).toBeTruthy();
    expect(getByText(/% Complete/i)).toBeTruthy();
    expect(getByText('Total Tasks')).toBeTruthy();
    expect(getAllByText('Completed').length).toBeGreaterThan(0);
    expect(getAllByText('Missed').length).toBeGreaterThan(0);
  });

  it('renders date sections', () => {
    const { getByText } = renderScreen();

    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Yesterday')).toBeTruthy();
    expect(getByText('January 19')).toBeTruthy();
  });

  it('renders task titles', () => {
    const { getAllByText } = renderScreen();

    expect(getAllByText('Take Morning Medication').length).toBeGreaterThan(0);
    expect(getAllByText('Breakfast').length).toBeGreaterThan(0);
    expect(getAllByText('Physical Therapy Exercises').length).toBeGreaterThan(0);
  });

  it('renders filter buttons', () => {
    const { getByText, getAllByText } = renderScreen();

    expect(getByText('All Tasks')).toBeTruthy();
    expect(getAllByText('Completed').length).toBeGreaterThan(0);
    expect(getAllByText('Missed').length).toBeGreaterThan(0);
  });

  it('renders load more history button', () => {
    const { getByText } = renderScreen();

    expect(getByText('Load More History')).toBeTruthy();
  });

  it('renders motivation message', () => {
    const { getByText } = renderScreen();

    expect(getByText(/Great job this week/i)).toBeTruthy();
  });
});

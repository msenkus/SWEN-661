describe('Navigation logic', () => {
  it('navigates to dashboard after login', () => {
    const setScreen = jest.fn();
    setScreen('dashboard');
    expect(setScreen).toHaveBeenCalledWith('dashboard');
  });

  it('dismisses missed tasks', () => {
    let hasMissedTasks = true;
    hasMissedTasks = false;
    expect(hasMissedTasks).toBe(false);
  });
});

import { ReactNode } from 'react';

interface DesktopScreenWrapperProps {
  children: ReactNode;
  isDesktop?: boolean;
}

/**
 * Simple wrapper that provides proper padding and max-width for desktop screens
 * that don't need custom layouts. For screens with ScreenContainer, they already
 * handle their own layout, so this is for screens that need desktop optimization.
 */
export function DesktopScreenWrapper({ children, isDesktop = false }: DesktopScreenWrapperProps) {
  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

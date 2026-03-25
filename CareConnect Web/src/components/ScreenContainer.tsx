import { ReactNode } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Screen } from './CareConnectApp';

interface ScreenContainerProps {
  title: string;
  children: ReactNode;
  onNavigate: (screen: Screen) => void;
  showBack?: boolean;
  backTo?: Screen;
}

export function ScreenContainer({
  title,
  children,
  onNavigate,
  showBack = false,
  backTo = 'dashboard',
}: ScreenContainerProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={() => onNavigate(backTo)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            ) : (
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="font-bold text-2xl">{title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
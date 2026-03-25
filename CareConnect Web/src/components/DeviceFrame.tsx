import { ReactNode } from 'react';

interface DeviceFrameProps {
  deviceType: 'iphone' | 'android-phone' | 'ipad' | 'android-tablet' | 'pc';
  orientation: 'portrait' | 'landscape';
  children: ReactNode;
}

export function DeviceFrame({ deviceType, orientation, children }: DeviceFrameProps) {
  const isTablet = deviceType === 'ipad' || deviceType === 'android-tablet';
  const isIOS = deviceType === 'iphone' || deviceType === 'ipad';
  const isPC = deviceType === 'pc';

  // Device dimensions (viewport size)
  const dimensions = {
    'iphone-portrait': { width: 390, height: 844 },
    'iphone-landscape': { width: 844, height: 390 },
    'android-phone-portrait': { width: 412, height: 915 },
    'android-phone-landscape': { width: 915, height: 412 },
    'ipad-portrait': { width: 820, height: 1180 },
    'ipad-landscape': { width: 1180, height: 820 },
    'android-tablet-portrait': { width: 800, height: 1280 },
    'android-tablet-landscape': { width: 1280, height: 800 },
    'pc-portrait': { width: 1440, height: 900 },
    'pc-landscape': { width: 1440, height: 900 },
  };

  const key = `${deviceType}-${orientation}` as keyof typeof dimensions;
  const { width, height } = dimensions[key];

  // PC view has different styling
  if (isPC) {
    return (
      <div className="relative inline-block">
        {/* PC Frame - Browser Window Style */}
        <div
          className="relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
          style={{
            width: width + 4,
            height: height + 36,
          }}
        >
          {/* Browser Chrome */}
          <div className="bg-gray-700 h-8 flex items-center px-3 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 mx-4 bg-gray-600 rounded px-3 py-0.5 text-xs text-gray-300">
              careconnect.app
            </div>
          </div>

          {/* Screen Content */}
          <div
            className="bg-white overflow-auto"
            style={{ width, height }}
          >
            {children}
          </div>
        </div>

        {/* Device Label */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          PC/Desktop Browser
          <span className="mx-2">•</span>
          {width} × {height}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {/* Device Frame */}
      <div
        className="relative bg-gray-950 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800"
        style={{
          width: width + 16,
          height: height + 16,
          padding: '8px',
        }}
      >
        {/* Notch/Camera (iOS only, portrait only for phone) */}
        {isIOS && !isTablet && orientation === 'portrait' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-950 rounded-full z-50" />
        )}

        {/* Screen Content */}
        <div
          className="bg-white overflow-hidden rounded-2xl"
          style={{ width, height }}
        >
          {children}
        </div>

        {/* Home Indicator (iOS) */}
        {isIOS && (
          <div
            className={`absolute ${
              orientation === 'portrait' ? 'bottom-1 left-1/2 -translate-x-1/2 w-32 h-1' : 'right-1 top-1/2 -translate-y-1/2 h-32 w-1'
            } bg-gray-600 rounded-full`}
          />
        )}
      </div>

      {/* Device Label */}
      <div className="text-center mt-4 text-gray-400 text-sm">
        {deviceType === 'iphone' && 'iPhone 14'}
        {deviceType === 'android-phone' && 'Android Phone'}
        {deviceType === 'ipad' && 'iPad Pro'}
        {deviceType === 'android-tablet' && 'Android Tablet'}
        <span className="mx-2">•</span>
        {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
      </div>
    </div>
  );
}
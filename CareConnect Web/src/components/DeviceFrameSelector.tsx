import { Smartphone, Tablet } from 'lucide-react';
import { Monitor } from 'lucide-react';

interface DeviceFrameSelectorProps {
  deviceType: 'iphone' | 'android-phone' | 'ipad' | 'android-tablet' | 'pc';
  orientation: 'portrait' | 'landscape';
  onDeviceChange: (device: 'iphone' | 'android-phone' | 'ipad' | 'android-tablet' | 'pc') => void;
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void;
}

export function DeviceFrameSelector({
  deviceType,
  orientation,
  onDeviceChange,
  onOrientationChange,
}: DeviceFrameSelectorProps) {
  const devices = [
    { id: 'iphone' as const, label: 'iPhone', icon: Smartphone },
    { id: 'android-phone' as const, label: 'Android Phone', icon: Smartphone },
    { id: 'ipad' as const, label: 'iPad', icon: Tablet },
    { id: 'android-tablet' as const, label: 'Android Tablet', icon: Tablet },
    { id: 'pc' as const, label: 'PC', icon: Monitor },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">Device Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => onDeviceChange(device.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                  deviceType === device.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <device.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{device.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">Orientation</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onOrientationChange('portrait')}
              className={`p-4 rounded-lg transition-all ${
                orientation === 'portrait'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              disabled={deviceType === 'pc'}
            >
              Portrait
            </button>
            <button
              onClick={() => onOrientationChange('landscape')}
              className={`p-4 rounded-lg transition-all ${
                orientation === 'landscape'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } ${deviceType === 'pc' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={deviceType === 'pc'}
            >
              Landscape
            </button>
          </div>
          {deviceType === 'pc' && (
            <p className="text-xs text-gray-400 mt-2">Orientation not applicable for PC view</p>
          )}
        </div>
      </div>
    </div>
  );
}
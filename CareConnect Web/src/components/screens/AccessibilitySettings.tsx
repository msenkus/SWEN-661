import { Eye, Volume2, Type, Palette, Bell, Vibrate } from 'lucide-react';
import { useState } from 'react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

export function AccessibilitySettings() {
  const { isMobile } = useBreakpoint();
  
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: true,
    audioAlerts: true,
    visualAlerts: true,
    vibrationAlerts: false,
    voiceGuidance: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const settingsGroups = [
    {
      title: 'Visual Settings',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      settings: [
        { key: 'highContrast' as const, label: 'High Contrast Mode', description: 'Increase contrast for better visibility' },
        { key: 'largeText' as const, label: 'Large Text', description: 'Increase font size throughout the app' },
      ],
    },
    {
      title: 'Audio Settings',
      icon: Volume2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      settings: [
        { key: 'audioAlerts' as const, label: 'Audio Alerts', description: 'Play sound for notifications and reminders' },
        { key: 'voiceGuidance' as const, label: 'Voice Guidance', description: 'Spoken instructions for tasks' },
      ],
    },
    {
      title: 'Notification Settings',
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      settings: [
        { key: 'visualAlerts' as const, label: 'Visual Alerts', description: 'Flash screen for important notifications' },
        { key: 'vibrationAlerts' as const, label: 'Vibration Alerts', description: 'Vibrate for notifications (mobile only)' },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Palette className="w-10 h-10 md:w-12 md:h-12" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Accessibility Settings</h1>
            <p className="text-purple-100 text-sm md:text-base">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="space-y-4 md:space-y-6">
        {settingsGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className={`${group.bgColor} p-4 md:p-6 border-b border-gray-200`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${group.color}`} />
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">{group.title}</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {group.settings.map((setting) => (
                  <div
                    key={setting.key}
                    className="p-4 md:p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1">
                        {setting.label}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">{setting.description}</p>
                    </div>
                    
                    <button
                      onClick={() => toggleSetting(setting.key)}
                      className={`relative w-12 h-6 md:w-14 md:h-7 rounded-full transition-colors flex-shrink-0 ${
                        settings[setting.key] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 md:top-1 w-5 h-5 md:w-5 md:h-5 bg-white rounded-full shadow-md transition-transform ${
                          settings[setting.key] ? 'translate-x-6 md:translate-x-7' : 'translate-x-0.5 md:translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="mt-6 md:mt-8">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}

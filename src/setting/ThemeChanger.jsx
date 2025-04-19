import React, { useState, useEffect } from 'react';

const themes = [
  { name: 'Light', className: 'theme-light', preview: '#f9fafb' },
  { name: 'Dark', className: 'theme-dark', preview: '#1f2937' },
  { name: 'Cyberpunk', className: 'theme-cyberpunk', preview: '#ff00ff' },
  { name: 'Sunset', className: 'theme-sunset', preview: '#f97316' },
];

export default function ThemeChanger() {
  const [selectedTheme, setSelectedTheme] = useState('Light');

  useEffect(() => {
    const saved = localStorage.getItem('holosquad-theme');
    if (saved) {
      setSelectedTheme(saved);
      document.body.className = getThemeClass(saved);
    }
  }, []);

  const getThemeClass = (themeName) => {
    const found = themes.find((t) => t.name === themeName);
    return found ? found.className : '';
  };

  const applyTheme = (themeName) => {
    setSelectedTheme(themeName);
    document.body.className = getThemeClass(themeName);
    localStorage.setItem('holosquad-theme', themeName);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">🎨 Choose Your Theme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`rounded-xl p-4 shadow-md text-center cursor-pointer ${
              selectedTheme === theme.name ? 'ring-4 ring-blue-500' : 'hover:ring-2 ring-blue-300'
            }`}
            style={{ backgroundColor: theme.preview }}
            onClick={() => applyTheme(theme.name)}
          >
            <p className="font-bold text-lg mb-2">{theme.name}</p>
            <div className="h-16 rounded-lg" style={{ backgroundColor: theme.preview }} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => applyTheme(selectedTheme)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Apply "{selectedTheme}" Theme
        </button>
      </div>
    </div>
  );
}

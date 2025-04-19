import React, { useState, useEffect } from 'react';

const fonts = [
  { name: 'Inter', css: "'Inter', sans-serif" },
  { name: 'Roboto', css: "'Roboto', sans-serif" },
  { name: 'Poppins', css: "'Poppins', sans-serif" },
  { name: 'Lobster', css: "'Lobster', cursive" },
];

export default function FontChanger() {
  const [selectedFont, setSelectedFont] = useState('Inter');

  useEffect(() => {
    const savedFont = localStorage.getItem('holosquad-font');
    if (savedFont) {
      setSelectedFont(savedFont);
      applyFont(savedFont);
    }
  }, []);

  const applyFont = (fontName) => {
    const selected = fonts.find(f => f.name === fontName);
    if (selected) {
      document.body.style.fontFamily = selected.css;
      localStorage.setItem('holosquad-font', fontName);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">🅰️ Change Font Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {fonts.map((font) => (
          <div
            key={font.name}
            onClick={() => {
              setSelectedFont(font.name);
              applyFont(font.name);
            }}
            style={{ fontFamily: font.css }}
            className={`cursor-pointer border rounded-xl p-4 text-center ${
              selectedFont === font.name ? 'ring-4 ring-blue-500' : 'hover:ring-2 ring-gray-300'
            }`}
          >
            <p className="text-xl">{font.name}</p>
            <p className="text-sm mt-2">The quick brown fox</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => applyFont(selectedFont)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Apply "{selectedFont}" Font
        </button>
      </div>
    </div>
  );
}

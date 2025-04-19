import React, { useState } from 'react';
import { FaLanguage } from 'react-icons/fa';

export default function LanguagePage() {
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSaveLanguage = () => {
    alert(`Language preference saved as: ${selectedLanguage}`);
    // Optionally, save the language setting to the backend or local storage
  };

  const handleResetLanguage = () => {
    setSelectedLanguage('English');
    alert('Language reset to default: English');
    // Optionally, reset language setting in the backend or local storage
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">🌍 Language Settings</h2>

      {/* Current Language Display */}
      <div className="mb-6 p-4 border-b">
        <h3 className="text-xl font-semibold">🗣️ Current Language</h3>
        <p className="text-gray-700 mt-2">The current selected language is: <strong>{selectedLanguage}</strong></p>
      </div>

      {/* Language Selection Dropdown */}
      <div className="mb-6 p-4 border-b">
        <h3 className="text-xl font-semibold">🌐 Select Your Preferred Language</h3>
        <div className="mt-4">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="p-2 rounded-lg border focus:outline-none"
          >
            {availableLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Save and Reset Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleSaveLanguage}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Save Preferences
        </button>
        <button
          onClick={handleResetLanguage}
          className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function ChatSettings() {
  const [readReceipts, setReadReceipts] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [chatTheme, setChatTheme] = useState('Default');
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const themes = ['Default', 'Dark', 'Cyberpunk', 'Ocean'];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Chat Settings</h2>

      {/* Toggle: Read Receipts */}
      <div className="flex items-center justify-between mb-4">
        <span>Read Receipts</span>
        <input
          type="checkbox"
          checked={readReceipts}
          onChange={() => setReadReceipts(!readReceipts)}
          className="toggle toggle-primary"
        />
      </div>

      {/* Toggle: Notifications */}
      <div className="flex items-center justify-between mb-4">
        <span>Chat Notifications</span>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="toggle toggle-primary"
        />
      </div>

      {/* Select: Chat Theme */}
      <div className="mb-4">
        <label className="block mb-1">Chat Theme</label>
        <select
          value={chatTheme}
          onChange={(e) => setChatTheme(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle: Mute */}
      <div className="flex items-center justify-between mb-4">
        <span>Mute Conversations</span>
        <input
          type="checkbox"
          checked={isMuted}
          onChange={() => setIsMuted(!isMuted)}
          className="toggle toggle-warning"
        />
      </div>

      {/* Button: Clear Chat */}
      <div className="mb-4">
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          onClick={() => alert('Chat history cleared!')}
        >
          Clear Chat History
        </button>
      </div>

      {/* Toggle: Block User */}
      <div className="flex items-center justify-between">
        <span>Block Users</span>
        <input
          type="checkbox"
          checked={isBlocked}
          onChange={() => setIsBlocked(!isBlocked)}
          className="toggle toggle-error"
        />
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function AccountPrivacy() {
  const [profileVisibility, setProfileVisibility] = useState('Everyone');
  const [messagePermission, setMessagePermission] = useState('Friends Only');
  const [tagPermission, setTagPermission] = useState('Friends');
  const [shareLocation, setShareLocation] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState(['user123', 'toxic_gamer']);

  const handleSave = () => {
    alert('Privacy settings saved ✅');
    // Optionally, send updated settings to backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Privacy Settings 🔒</h2>

      {/* Profile Visibility */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Who can see your profile?</label>
        <select
          className="w-full border p-2 rounded"
          value={profileVisibility}
          onChange={(e) => setProfileVisibility(e.target.value)}
        >
          <option>Everyone</option>
          <option>Friends Only</option>
          <option>Only Me</option>
        </select>
      </div>

      {/* Messaging Permission */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Who can message you?</label>
        <select
          className="w-full border p-2 rounded"
          value={messagePermission}
          onChange={(e) => setMessagePermission(e.target.value)}
        >
          <option>Everyone</option>
          <option>Friends Only</option>
          <option>No One</option>
        </select>
      </div>

      {/* Tag Permission */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Who can tag you in posts?</label>
        <select
          className="w-full border p-2 rounded"
          value={tagPermission}
          onChange={(e) => setTagPermission(e.target.value)}
        >
          <option>Everyone</option>
          <option>Friends</option>
          <option>No One</option>
        </select>
      </div>

      {/* Location Sharing */}
      <div className="flex items-center justify-between mb-6">
        <label className="font-semibold">Share location with friends</label>
        <input
          type="checkbox"
          checked={shareLocation}
          onChange={() => setShareLocation(!shareLocation)}
          className="toggle toggle-primary"
        />
      </div>

      {/* Blocked Users */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Blocked Users</h4>
        {blockedUsers.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {blockedUsers.map((user, idx) => (
              <li key={idx}>{user}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't blocked anyone yet.</p>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl w-full"
      >
        Save Settings
      </button>
    </div>
  );
}

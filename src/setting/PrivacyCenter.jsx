import React, { useState } from 'react';
import { FaLock, FaBell, FaShieldAlt, FaUser, FaEnvelope } from 'react-icons/fa';

export default function PrivacyCenter() {
  const [dataSharing, setDataSharing] = useState(true); // Example state for user data sharing
  const [securityAlerts, setSecurityAlerts] = useState(true); // Example for login alerts
  const [twoFA, setTwoFA] = useState(false); // Two-factor authentication
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleSaveChanges = () => {
    alert('Privacy settings updated successfully!');
    // Optionally, you could send the updated settings to your backend here.
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">🛡️ Privacy Center</h2>

      {/* Personal Data Sharing */}
      <div className="flex items-center justify-between mb-6 p-4 border-b">
        <div className="flex items-center gap-3">
          <FaUser className="text-blue-500" />
          <span className="font-semibold">Personal Data Sharing</span>
        </div>
        <input
          type="checkbox"
          checked={dataSharing}
          onChange={() => setDataSharing(!dataSharing)}
          className="toggle toggle-primary"
        />
      </div>

      {/* Security Settings */}
      <div className="flex items-center justify-between mb-6 p-4 border-b">
        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-green-500" />
          <span className="font-semibold">Two-Factor Authentication (2FA)</span>
        </div>
        <input
          type="checkbox"
          checked={twoFA}
          onChange={() => setTwoFA(!twoFA)}
          className="toggle toggle-primary"
        />
      </div>

      <div className="flex items-center justify-between mb-6 p-4 border-b">
        <div className="flex items-center gap-3">
          <FaLock className="text-yellow-500" />
          <span className="font-semibold">Login Security Alerts</span>
        </div>
        <input
          type="checkbox"
          checked={securityAlerts}
          onChange={() => setSecurityAlerts(!securityAlerts)}
          className="toggle toggle-primary"
        />
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">🔔 Notification Preferences</h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <span>Email Notifications</span>
          </div>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
            className="toggle toggle-primary"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaBell className="text-purple-500" />
            <span>Push Notifications</span>
          </div>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
            className="toggle toggle-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBell className="text-red-500" />
            <span>SMS Notifications</span>
          </div>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      {/* Data Requests */}
      <div className="mb-6 p-4 border-b">
        <h3 className="text-xl font-semibold mb-4">📊 Data Requests</h3>
        <p className="text-gray-700 mb-2">You can request to download or delete your personal data from HoloSquad.</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
          Download Data
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 ml-4">
          Delete Account
        </button>
      </div>

      {/* Change Password */}
      <div className="text-center mt-6">
        <button className="bg-yellow-600 text-white py-2 px-6 rounded-xl hover:bg-yellow-700">
          Change Password
        </button>
      </div>

      {/* Save Settings */}
      <div className="text-center mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

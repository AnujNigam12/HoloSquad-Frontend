import React, { useState } from 'react';
import { FaCheckCircle, FaUserShield, FaRocket, FaStar, FaUnlock } from 'react-icons/fa';

export default function VerifiedPage() {
  const [isVerified, setIsVerified] = useState(false); // Replace with backend logic

  const handleApply = () => {
    alert('Your verification request has been submitted!');
    // Trigger actual backend call
  };

  const benefits = [
    { icon: <FaStar />, text: 'Priority Support' },
    { icon: <FaRocket />, text: 'Boosted Profile Visibility' },
    { icon: <FaUserShield />, text: 'Credibility & Trust Badge' },
    { icon: <FaUnlock />, text: 'Access to Beta Features' },
  ];

  const requirements = [
    'Complete Profile with Profile Picture',
    'Minimum 500 Followers',
    'Active for at least 30 days',
    'No recent policy violations',
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">✅ HoloSquad Verified</h2>

      {/* Verification Badge Status */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-3 text-xl font-semibold border p-3 rounded-xl bg-gray-100">
          <FaCheckCircle className={`text-${isVerified ? 'blue' : 'gray'}-500`} />
          {isVerified ? (
            <span className="text-blue-600">You are Verified</span>
          ) : (
            <span className="text-gray-600">Not Verified</span>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">🎁 Benefits of Being Verified</h3>
        <ul className="space-y-2">
          {benefits.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <span className="text-blue-500">{item.icon}</span> {item.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">📋 Requirements</h3>
        <ul className="list-disc list-inside text-gray-600">
          {requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Apply Button */}
      {!isVerified && (
        <div className="text-center">
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Apply for Verification
          </button>
        </div>
      )}
    </div>
  );
}

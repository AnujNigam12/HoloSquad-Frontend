import React, { useState } from 'react';
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaSearch } from 'react-icons/fa';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login page, click "Forgot Password", and follow the instructions sent to your email.',
  },
  {
    question: 'How do I change my account settings?',
    answer: 'Go to the "Settings" page from the main navigation. From there, you can update your profile, privacy settings, and notification preferences.',
  },
  {
    question: 'How can I upgrade my account?',
    answer: 'To upgrade your account, go to the "Account" section and select the "Upgrade" option. You will be guided through the process.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'To delete your account, please contact support from the "Contact" section, and we will assist you with the deletion request.',
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">❓ Help & Support</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center border p-2 rounded-xl shadow-sm">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-lg border-none focus:outline-none"
          placeholder="Search Help Articles..."
        />
      </div>

      {/* FAQ Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">🔍 Frequently Asked Questions</h3>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="mb-4 p-4 border-b">
              <h4 className="font-semibold text-lg">{faq.question}</h4>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No results found. Try searching again.</p>
        )}
      </div>

      {/* Guides Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">📘 Step-by-Step Guides</h3>
        <ul className="space-y-3 text-gray-700">
          <li>
            <a href="/guide/account-settings" className="text-blue-500 hover:underline">How to Change Your Account Settings</a>
          </li>
          <li>
            <a href="/guide/upgrade-account" className="text-blue-500 hover:underline">How to Upgrade Your HoloSquad Account</a>
          </li>
          <li>
            <a href="/guide/data-privacy" className="text-blue-500 hover:underline">How to Manage Your Privacy Settings</a>
          </li>
        </ul>
      </div>

      {/* Troubleshooting Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">🛠️ Troubleshooting Tips</h3>
        <ul className="space-y-3 text-gray-700">
          <li>If you're facing issues logging in, try clearing your cache and cookies.</li>
          <li>If notifications are not coming through, check your notification preferences and make sure they are enabled.</li>
          <li>Ensure that your app is up to date with the latest version to avoid bugs and performance issues.</li>
        </ul>
      </div>

      {/* Contact Support Section */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-4">📞 Contact Support</h3>
        <p>If you need further assistance, feel free to reach out to us:</p>
        <div className="mt-4">
          <a href="tel:+1234567890" className="flex items-center justify-center gap-2 text-blue-500 hover:underline">
            <FaPhoneAlt /> Call Support
          </a>
        </div>
        <div className="mt-2">
          <a href="mailto:support@holosquad.com" className="flex items-center justify-center gap-2 text-blue-500 hover:underline">
            <FaEnvelope /> Email Support
          </a>
        </div>
      </div>
    </div>
  );
}

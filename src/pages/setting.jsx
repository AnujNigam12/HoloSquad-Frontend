import React, { useState } from 'react';
import PeofilePage from './ProfilePage'
import Notifications from './Notifications';
import PollPage from '../setting/PollPage';
import ChatSettings from '../setting/ChatSettings';
import InsightsPage from '../setting/InsightsPage';
import AccountStatus from '../setting/AccountStatus';
import AccountPrivacy from '../setting/AccountPrivacy';
import ThemeChanger from '../setting/ThemeChanger';
import FontChanger from '../setting/FontChanger';
import VerifiedPage from '../setting/VerifiedPage';
import PrivacyCenter from '../setting/PrivacyCenter';
import HelpPage from '../setting/HelpPage';
import FamilyCenter from '../setting/FamilyCenter';
import LanguagePage from '../setting/LanguagePage';

const pages = {
  Profile: <PeofilePage/>,
  Notification: <Notifications/>,
  Poll: <PollPage/>,
  Chat: <ChatSettings/>,
  Insight: <InsightsPage/>,
  Account_Status: <AccountStatus/>,
  Account_Privacy: <AccountPrivacy/>,
  Language: <LanguagePage/>,
  Themes: <ThemeChanger/>,
  Font: <FontChanger/>,
  Family_Center: <FamilyCenter/>,
  HoloSquad_Verified: <VerifiedPage/>,
  Privacy_Center: <PrivacyCenter/>,
  Help: <HelpPage/>,
};

export default function SettingPane() {
  const [selectedPage, setSelectedPage] = useState('Setting');

  return (
    <div className="flex">
      {/* Left Panel */}
      <div className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
        {Object.keys(pages).map((page) => (
          <button
            key={page}
            onClick={() => setSelectedPage(page)}
            className={`block w-full text-left p-3 rounded hover:bg-gray-700 ${
              selectedPage === page ? 'bg-gray-700' : ''
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>

      {/* Right Panel */}
      <div className="w-3/4 p-8">
        <h1 className="text-2xl font-bold capitalize mb-4">
          {selectedPage} Page
        </h1>
        <p>{pages[selectedPage]}</p>
      </div>
    </div>
  );
}

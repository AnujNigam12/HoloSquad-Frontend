import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { day: 'Mon', messages: 120 },
  { day: 'Tue', messages: 300 },
  { day: 'Wed', messages: 250 },
  { day: 'Thu', messages: 400 },
  { day: 'Fri', messages: 280 },
  { day: 'Sat', messages: 350 },
  { day: 'Sun', messages: 150 },
];

export default function InsightsPage() {
  const totalMessages = 1850;
  const activeFriends = 46;
  const peakHours = '8PM - 10PM';
  const topChats = ['SquadZone 🔥', 'DevTalk 💻', 'Chill Vibes 🎧'];

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">HoloSquad Insights 📊</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-gray-500">Total Messages</p>
          <h3 className="text-2xl font-bold">{totalMessages}</h3>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-gray-500">Active Friends Today</p>
          <h3 className="text-2xl font-bold">{activeFriends}</h3>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-gray-500">Peak Chat Hours</p>
          <h3 className="text-2xl font-bold">{peakHours}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h4 className="text-xl font-semibold mb-4">📈 Messages This Week</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="messages" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4">🔥 Most Active Chats</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {topChats.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

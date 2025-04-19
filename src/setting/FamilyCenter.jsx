import React, { useState } from 'react';
import { FaUserPlus, FaUserTimes, FaCogs, FaLock } from 'react-icons/fa';

const familyMembers = [
  { id: 1, name: 'John Doe', role: 'Admin', activity: 'Active 2 days ago' },
  { id: 2, name: 'Jane Doe', role: 'Member', activity: 'Active 1 hour ago' },
  { id: 3, name: 'Emily Doe', role: 'Member', activity: 'Active 3 days ago' },
];

export default function FamilyCenter() {
  const [members, setMembers] = useState(familyMembers);
  const [newMemberName, setNewMemberName] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const newMember = {
        id: members.length + 1,
        name: newMemberName,
        role: 'Member',
        activity: 'Just joined',
      };
      setMembers([...members, newMember]);
      setNewMemberName('');
      setShowInviteForm(false);
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">👨‍👩‍👧‍👦 Family Center</h2>

      {/* Invite Family Member */}
      <div className="mb-6">
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          <FaUserPlus className="inline-block mr-2" /> Invite Family Member
        </button>
        {showInviteForm && (
          <div className="mt-4 flex items-center gap-3">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Enter family member's name"
              className="p-2 rounded-lg border focus:outline-none"
            />
            <button
              onClick={handleAddMember}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Add Member
            </button>
          </div>
        )}
      </div>

      {/* Family Member List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">👪 Family Members</h3>
        <ul className="space-y-4">
          {members.map((member) => (
            <li key={member.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{member.name}</div>
                <span className="text-sm text-gray-600">({member.role})</span>
              </div>
              <div className="text-gray-500">{member.activity}</div>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaUserTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Family Privacy Settings */}
      <div className="mb-6 p-4 border-b">
        <h3 className="text-xl font-semibold mb-4">🔐 Family Privacy Settings</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaLock className="text-blue-500" />
            <span className="font-semibold">Allow Family Members to Message Each Other</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaLock className="text-blue-500" />
            <span className="font-semibold">Allow Family Members to View Posts</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLock className="text-blue-500" />
            <span className="font-semibold">Allow Family Members to Share Content</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
          />
        </div>
      </div>

      {/* Family Role Management */}
      <div className="text-center mt-6">
        <button className="bg-yellow-600 text-white py-2 px-6 rounded-xl hover:bg-yellow-700">
          <FaCogs className="inline-block mr-2" /> Manage Roles & Permissions
        </button>
      </div>
    </div>
  );
}

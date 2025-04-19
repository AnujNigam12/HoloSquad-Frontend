import React, { useState } from 'react';

export default function PollPage() {
  const [poll, setPoll] = useState({
    question: 'What feature should we add next to HoloSquad?',
    options: [
      { id: 1, text: 'Dark Mode', votes: 0 },
      { id: 2, text: 'Voice Chat', votes: 0 },
      { id: 3, text: 'Live Streaming', votes: 0 },
      { id: 4, text: 'Custom Avatars', votes: 0 },
    ],
  });

  const [votedOption, setVotedOption] = useState(null);

  const handleVote = (optionId) => {
    if (votedOption !== null) return;

    const updatedOptions = poll.options.map((option) =>
      option.id === optionId ? { ...option, votes: option.votes + 1 } : option
    );

    setPoll({ ...poll, options: updatedOptions });
    setVotedOption(optionId);
  };

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{poll.question}</h2>
      <div className="space-y-4">
        {poll.options.map((option) => {
          const percentage = totalVotes ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;

          return (
            <div key={option.id}>
              <button
                onClick={() => handleVote(option.id)}
                disabled={votedOption !== null}
                className="w-full text-left p-3 border rounded hover:bg-gray-100 disabled:opacity-70"
              >
                {option.text}
              </button>

              {votedOption !== null && (
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-blue-600 h-4 rounded-full text-xs text-black text-center"
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage}%
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {votedOption && (
        <p className="text-green-600 mt-6 text-center font-semibold">
          Thanks for voting! 🗳️
        </p>
      )}
    </div>
  );
}

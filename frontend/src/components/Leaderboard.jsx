import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        const validUsers = res.data.filter(
          (user) => user && user.name && user.totalPoints !== undefined
        );
        setUsers(validUsers);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) {
      setMessage('Please select a user.');
      return;
    }

    try {
      const res = await axios.post('/api/claim', { userId: selectedUserId });
      setMessage(res.data.message || 'Points claimed!');

      // Update leaderboard after claiming
      const updated = await axios.get('/api/leaderboard');
      const validUsers = updated.data.filter(
        (user) => user && user.name && user.totalPoints !== undefined
      );
      setUsers(validUsers);
    } catch (err) {
      console.error('Error claiming points:', err);
      setMessage('Failed to claim points.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center">Points Tracker</h1>

      {/* User Dropdown */}
      <div className="flex gap-4 items-center justify-center">
        <select
          className="border px-4 py-2 rounded"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) =>
            user && user._id && user.name ? (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ) : null
          )}
        </select>
        <button
          onClick={handleClaim}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Claim Points
        </button>
      </div>

      {message && (
        <p className="text-center text-green-600 font-semibold">{message}</p>
      )}

      {/* Leaderboard */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Points</th>
            </tr>
          </thead>
         <tbody>
  {user.map((c, d) => (
    <tr className="border-t" key={d}>
      <td className="p-2">
        {c.userId?.name ?? 'Unknown'}
      </td>
      <td className="p-2">
        {c.points ?? 0}
      </td>
      <td className="p-2">
        {c.timestamp ? new Date(c.timestamp).toLocaleString() : 'N/A'}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

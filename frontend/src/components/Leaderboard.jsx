import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch users (leaderboard)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchUsers();
  }, []);

  // Handle Claim Points
  const handleClaim = async () => {
    if (!selectedUserId) {
      setMessage('Please select a user first!');
      return;
    }

    try {
      const res = await axios.post('/api/claim', { userId: selectedUserId });
      setMessage(res.data.message);

      // Update leaderboard
      const updated = await axios.get('/api/leaderboard');
      setUsers(updated.data);

      // Add new claim entry to history
      setClaimHistory((prev) => [res.data.claim, ...prev]);
    } catch (err) {
      console.error('Error claiming points:', err);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">🏆 Points Tracker</h1>

      {/* Dropdown */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <select
          className="border p-2 rounded w-full sm:w-1/2"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleClaim}
        >
          Claim Points
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div className="text-center text-green-600 font-medium">{message}</div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Points</th>
            </tr>
          </thead>
         <tbody>
  {Array.isArray(i) && i.map((c, d) => (
    <tr className="border-t" key={d}>
      <td className="p-2">
        {c?.userId?.name || "Unknown"}
      </td>
      <td className="p-2">
        {c?.points ?? "N/A"}
      </td>
      <td className="p-2">
        {c?.timestamp ? new Date(c.timestamp).toLocaleString() : "No time"}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Claim History Table */}
      {claimHistory.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-xl font-semibold mb-2">Recent Claims</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Points</th>
                <th className="p-2 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {claimHistory.map((claim, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border">{claim.userId?.name || 'Unknown'}</td>
                  <td className="p-2 border">{claim.points}</td>
                  <td className="p-2 border">
                    {new Date(claim.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

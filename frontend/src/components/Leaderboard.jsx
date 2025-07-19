import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/leaderboard`);
      const validUsers = (res.data || [])
        .filter((u) => u && u.name && u.totalPoints !== undefined)
        .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
      setUsers(validUsers);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">🏆 Leaderboard</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td className="p-2 text-center" colSpan="3">
                No data available
              </td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr key={u._id || i} className="border-t">
                <td className="p-2">#{i + 1}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.totalPoints}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

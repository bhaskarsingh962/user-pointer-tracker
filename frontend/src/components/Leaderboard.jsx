import { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/leaderboard`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // auto-refresh
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
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{u.rank}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

import { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryTable = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/claim/history`);
      setHistory(res.data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">🕒 Claim History</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User</th>
            <th className="p-2">Points</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(history) && history.length > 0 ? (
            history.map((h, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{h.userId?.name || 'Unknown'}</td>
                <td className="p-2">{h.points}</td>
                <td className="p-2">{new Date(h.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 text-center" colSpan="3">
                No history available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;

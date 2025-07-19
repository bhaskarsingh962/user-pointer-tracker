import React from "react";

const HistoryTable = ({ history }) => {
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <div className="overflow-x-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">📝 Claim History</h3>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Points</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {safeHistory.map((entry, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="px-4 py-2">{entry.user?.name || "Unknown"}</td>
              <td className="px-4 py-2">{entry.points}</td>
              <td className="px-4 py-2">{new Date(entry.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;

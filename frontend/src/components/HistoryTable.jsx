import React from "react";

const HistoryTable = ({ history }) => {
  if (!Array.isArray(history)) {
    return <div>No history data available.</div>;
  }

  return (
    <div className="mt-6 border rounded-xl overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Points</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">
                {entry?.userId?.name || "Unknown"}
              </td>
              <td className="p-2">
                {entry?.points ?? "N/A"}
              </td>
              <td className="p-2">
                {entry?.timestamp ? new Date(entry.timestamp).toLocaleString() : "No time"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;

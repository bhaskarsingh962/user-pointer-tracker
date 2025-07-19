import React from "react";

const HistoryTable = ({ history }) => {
  return (
    <div className="overflow-x-auto border rounded mt-4">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 font-semibold">Name</th>
            <th className="p-2 font-semibold">Points</th>
            <th className="p-2 font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{entry.userId?.name || "Unknown"}</td>
              <td className="p-2">{entry.points}</td>
              <td className="p-2">
                {new Date(entry.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;

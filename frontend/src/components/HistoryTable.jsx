const HistoryTable = ({ history = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Points</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(history) ? history : []).map((entry, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{entry?.userId?.name || "Unknown"}</td>
              <td className="p-2">{entry?.points ?? "N/A"}</td>
              <td className="p-2">
                {entry?.timestamp
                  ? new Date(entry.timestamp).toLocaleString()
                  : "No time"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

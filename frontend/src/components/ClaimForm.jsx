import React, { useState, useEffect } from "react";
import axios from "axios";
import HistoryTable from "./HistoryTable";

const ClaimForm = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch all users and their history on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/history");
        setHistory(res.data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchUsers();
    fetchHistory();
  }, []);

  const handleClaim = async () => {
    if (!userId) {
      alert("Please select a user.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/claim", { userId });
      alert(res.data.message || "Points claimed!");

      // Refresh history after claim
      const historyRes = await axios.get("/api/history");
      setHistory(historyRes.data || []);
    } catch (err) {
      console.error("Error claiming points:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">🎯 Claim Points</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleClaim}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Claiming..." : "Claim Points"}
        </button>
      </div>

      {/* Leaderboard */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">🏆 Leaderboard</h3>
        <ul className="space-y-1 list-disc list-inside">
          {users
            .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
            .map((user, index) => (
              <li key={user._id}>
                #{index + 1} - {user.name} ({user.totalPoints || 0} pts)
              </li>
            ))}
        </ul>
      </div>

      {/* History Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">📜 History</h3>
        <HistoryTable history={history} />
      </div>
    </div>
  );
};

export default ClaimForm;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimForm = ({ onClaim }) => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/leaderboard")
      .then(res => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  const handleClaim = async () => {
    if (!userId) return alert("Please select a user");
    await axios.post("/api/claim", { userId });
    onClaim(); // refresh data
  };

  return (
    <div className="space-y-4">
      <select
        className="border p-2 rounded w-full sm:w-auto"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">-- Select User --</option>
        {Array.isArray(users) && users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleClaim}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Claim Points
      </button>
    </div>
  );
};

export default ClaimForm;

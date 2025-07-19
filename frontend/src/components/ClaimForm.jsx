import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const ClaimForm = ({ onClaim }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/api/users`);
        setUsers(res.data);
      } catch {
        setError('❌ Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name.trim()) return;
    try {
      const res = await axios.post(`${API}/users`, { name });
      setUsers((prev) => [...prev, res.data]);
      setName('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding user.');
    }
  };

  const handleClaim = async () => {
    if (!selectedId) return;
    try {
      const res = await axios.post(`${API}/claim`, { userId: selectedId });
      onClaim(); // notify parent
      alert(`✅ Claimed ${res.data.points} points!`);
      setError('');
    } catch {
      setError('❌ Failed to claim points.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-6 space-y-4">
      <h2 className="text-xl font-semibold">🎯 Claim Points</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <div className="text-gray-600">No users found. Please add a user below to begin.</div>
      ) : (
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedId(e.target.value)}
          value={selectedId}
        >
          <option value="">Select User</option>
          {Array.isArray(users) &&
            users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
        </select>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          className={`px-4 py-2 rounded text-white transition ${
            selectedId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleClaim}
          disabled={!selectedId}
        >
          Claim
        </button>

        <input
          type="text"
          placeholder="Add new user"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddUser}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ClaimForm;

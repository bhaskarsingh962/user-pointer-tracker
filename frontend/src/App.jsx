import ClaimForm from './components/ClaimForm';
import Leaderboard from './components/Leaderboard';
import HistoryTable from './components/HistoryTable';
import { useState } from 'react';

function App() {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📊 Points Tracker</h1>
        <ClaimForm onClaim={triggerReload} />
        <Leaderboard key={reload} />
        <HistoryTable key={reload} />
      </div>
    </div>
  );
}

export default App;

import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({ userId, points });
  await history.save();

  res.json({ message: 'Points claimed', points });
};

export const getHistory = async (req, res) => {
  const history = await ClaimHistory.find()
    .populate('userId', 'name')
    .sort({ timestamp: -1 });
  res.json(history);
};

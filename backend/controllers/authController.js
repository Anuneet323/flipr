const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Password required' });
  if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ role: 'admin' }, process.env.ADMIN_TOKEN_SECRET || 'secret', { expiresIn: '8h' });
  res.json({ token });
};

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple in-memory user store for dev
const users = [
  { id: 1, email: 'demo@thinknode.com', password: 'password', name: 'Demo User' },
];

function makeToken() {
  return `server-token-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

app.post('/api/customer/register', (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (users.find((u) => u.email === email)) return res.status(409).json({ message: 'User exists' });
  const id = users.length + 1;
  const user = { id, email, password, name: name || email.split('@')[0] };
  users.push(user);
  const token = makeToken();
  return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

app.post('/api/customer/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = makeToken();
  return res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

// Basic healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ThinkNode dev backend running on http://localhost:${PORT}`);
});

import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

// Dummy data
const users: User[] = [
  {
    id: 1,
    email: 'admin@wsd.com',
    password: '$2b$15$nal1zUN2VBqW0uF9QI8.8uSwWIykz2Zb9TPtktTji0NauXiJqaw42',
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@wsd.com',
    password: '$2b$15$YxafKZgeNPWCSCffSVAFneGMx/i..7XXkpmzRkQY.avF7mmTYM07e',
    role: 'user',
  },
];

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  // Find the user in the database
  let user = users.find((u) => u.email === req.body.email);
  if (!user) return res.json({ success: false, error: 'Incorrect email or password' });

  // Compare the password with the password in the database
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json({ success: false, error: 'Incorrect email or password' });

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.SECRETKEY,
    { expiresIn: '15m' }
  );

  res.send({
    success: true,
    token: token,
  });
});

export default router;

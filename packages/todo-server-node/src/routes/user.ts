import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

const router = express.Router();

router.get('/', () => {
  console.log('############# 1');
});

const errorHandleAsync = (func: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response) => {
    func(req, res)
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.error(e);
        res.status(e.code).json({ status: e.code, message: e.message });
      });
  };
};

router.post('/register', async (req, res) => {
  const { signId, password } = req.body;
  const user = await User.findOne({ signId });
  if (user) return res.status(500).json({ error: { status: 500, message: '이미 존재하는 아이디입니다.' } });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const userFields = { uid: 'test-1234', signId, password: hashed };

  const newUser = new User(userFields);
  await newUser.save();
  // await newUser.save((err, userInfo) => {
  //   if (err) console.log(err);
  //   return res.status(200).json({ success: true });
  // });
  return res.send(user);
});

router.post(
  '/login',
  errorHandleAsync(async (req, res) => {
    console.log(req, res);
  })
);

export default router;

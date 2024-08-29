import express, { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import Task from '../models/task';

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const tid = uuidV4();
  const newTask = new Task({ tid, ...body });
  await newTask.save().then(() => {
    res.send({
      status: 200,
      message: '일정이 등록되었습니다.'
    });
  });
  return;
});

export default router;

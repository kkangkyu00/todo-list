import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import user from './routes/user';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://kyuseok:YyQXWuuDEaMv2Xh4@cluster0.hivqglb.mongodb.net/todo-server-mongoose';

mongoose
  .connect(mongoURI)
  .then(() => console.log('connect'))
  .catch((err) => console.log(err));

app.use(express.json());
// app.use(express.static('build'));

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('welcome!');
});

// app.use('/api/auth', auth);
app.use('/api/user', user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

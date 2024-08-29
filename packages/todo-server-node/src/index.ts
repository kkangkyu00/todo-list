import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import user from './routes/user';
import task from './routes/task';

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
app.use(cors());

app.use('/api/user', user);
app.use('/todo-server-node/api/v1/task', task);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/api/welcome', (req: Request, res: Response) => {
  console.log('dldldldl2');
  res.send('welcome!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

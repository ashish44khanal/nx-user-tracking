/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { verfiyObject } from '@tracker-workspace/utils';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to ex-be-app!' });
});

app.get('/api/hello', (req, res) => {
  const body={
    message: 'Hello World! how are you doing?',
    data: {
      name: 'John Doe',
  }
}
const obj=verfiyObject(body);
  res.send({ isObject:obj,message: 'Hello World! how are you doing?',body });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

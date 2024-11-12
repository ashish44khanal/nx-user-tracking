/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Request, Response } from 'express';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to ex-be-app!' });
});

app.get('/api/check-user', (req: Request, res: Response) => {
  const consentGiven = req.cookies.cookieConsent === 'true';
  const userId = req.cookies.userId;

  if (!userId) {
    // New user; inform the frontend that consent is needed
    res.json({ isNewUser: true, consentGiven });
  } else {
    // Returning user
    res.json({ isNewUser: false, consentGiven });
  }
});

app.post('/api/set-consent', (req, res) => {
  const userId = req.cookies.userId || `user-${Math.random().toString(36).substring(2, 15)}`;

  // Set `userId` and `cookieConsent` cookies directly
  res.cookie('userId', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 365 * 24 * 60 * 60 * 1000,  // 1 year in milliseconds
  });

  res.cookie('cookieConsent', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 365 * 24 * 60 * 60 * 1000,  // 1 year in milliseconds
  });

  res.status(200).json({ message: 'Consent granted and cookies set' });
});


app.post('/api/track', (req: Request, res: Response) => {
  const { event, details } = req.body;
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing' });
  }

  // Insert tracking data into the database here
  console.log(`User ID: ${userId}, Event: ${event}`, details);
  res.status(200).json({ message: 'Event tracked' });
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

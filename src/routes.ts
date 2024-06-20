import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, '../db.json');

router.get('/ping', (req, res) => {
  res.send(true);
});

router.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const newSubmission = { name, email, phone, github_link, stopwatch_time };

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  db.submissions.push(newSubmission);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(200).send('Submission successful');
});

router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  if (index >= 0 && index < db.submissions.length) {
    res.json(db.submissions[index]);
  } else {
    res.status(404).send('Submission not found');
  }
});

export default router;

import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, '../db.json');

// Helper functions to read and write the database
const getSubmissions = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8')).submissions;
const saveSubmissions = (data: any) => {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    db.submissions = data;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

router.get('/ping', (req, res) => {
    res.send(true);
});

router.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    const submissions = getSubmissions();
    submissions.push(newSubmission);
    saveSubmissions(submissions);

    res.status(200).send('Submission successful');
});

router.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const submissions = getSubmissions();
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    } else {
        res.status(404).send('Submission not found');
    }
});

router.get('/submissions', (req, res) => {
    const submissions = getSubmissions();
    res.json(submissions);
});

router.delete('/delete', (req, res) => {
    const email = req.query.email as string;
    let submissions = getSubmissions();
    const index = submissions.findIndex((submission: any) => submission.email === email);

    if (index !== -1) {
        submissions.splice(index, 1);
        saveSubmissions(submissions);
        res.status(200).send('Submission deleted successfully');
    } else {
        res.status(404).send('Submission not found');
    }
});

router.put('/edit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const updatedSubmission = { name, email, phone, github_link, stopwatch_time };

    let submissions = getSubmissions();
    const index = submissions.findIndex((submission: any) => submission.email === email);

    if (index !== -1) {
        submissions[index] = updatedSubmission;
        saveSubmissions(submissions);
        res.status(200).send('Submission edited successfully');
    } else {
        res.status(404).send('Submission not found');
    }
});

router.get('/search', (req, res) => {
    const email = req.query.email as string;
    const submissions = getSubmissions();
    const filteredSubmissions = submissions.filter((submission: any) => submission.email === email);

    if (filteredSubmissions.length > 0) {
        res.json(filteredSubmissions);
    } else {
        res.status(404).send('No submissions found for the provided email');
    }
});

export default router;

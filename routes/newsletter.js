// routes/newsletter.js
const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');


// POST
router.post('/', async (req, res) => {
  const { email } = req.body;

// GET - fetch all subscribers 
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (err) {
    console.error('[Newsletter GET Error]', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  try {
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }

    const newEntry = new Newsletter({ email: email.toLowerCase() });
    await newEntry.save();

    return res.status(201).json({ message: 'Thank you for subscribing!' });
  } catch (err) {
    console.error('[Newsletter POST Error]', err);
    return res.status(500).json({ message: 'Something went wrong on the server.' });
  }
});

module.exports = router;

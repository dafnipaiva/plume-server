const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription.model');
const { ObjectId } = require('mongodb');

// Add new subscription
router.post('/add', async (req, res) => {
  const { name, amount, nextPayment, userId } = req.body; // Adicionar userId aos parâmetros
  try {
    const subscription = new Subscription({ name, amount, nextPayment: new Date(nextPayment), userId: ObjectId(userId) });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subscription' });
  }
});

// Get all subscriptions
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const subscriptions = await Subscription.find({ userId: ObjectId(userId) });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// Get specific subscription
router.get('/subscription/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Edit subscription
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, amount, nextPayment, userId } = req.body;
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { name, amount, nextPayment: new Date(nextPayment), userId: ObjectId(userId) },
      { new: true }
    );
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error });
  }
});

// Delete subscription
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Basic test route
router.get('/ping', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      success: true,
      message: 'API is working and connected to the database!',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to the database',
      error: error.message
    });
  }
});

module.exports = router;

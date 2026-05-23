const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Get all appointments for logged-in client
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, b.name as barber_name, s.name as service_name, s.price
       FROM appointments a
       JOIN barbers b ON a.barber_id = b.id
       JOIN services s ON a.service_id = s.id
       WHERE a.client_id = $1
       ORDER BY a.appointment_date, a.appointment_time`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book an appointment
router.post('/', authMiddleware, async (req, res) => {
  const { barber_id, service_id, appointment_date, appointment_time, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO appointments (client_id, barber_id, service_id, appointment_date, appointment_time, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, barber_id, service_id, appointment_date, appointment_time, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

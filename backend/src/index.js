const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const barberRoutes = require('./routes/barbers');
const appointmentRoutes = require('./routes/appointments');
const serviceRoutes = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check — used by AWS ALB
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'barbershop-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Barbershop API running on port ${PORT}`);
});

module.exports = app;

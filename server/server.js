const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminMenuRoutes = require('./routes/adminMenuRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log('REQUEST RECEIVED:', req.method, req.url);
  next();
});
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/menu', adminMenuRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/profile', profileRoutes);
app.get('/', (req, res) => {
  res.send('Restaurant Ordering System API is running!')
})

app.get('/test', (req, res) => {
  res.send('TEST ROUTE WORKING')
})
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
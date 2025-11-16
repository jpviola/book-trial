require('dotenv').config();

module.exports = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  frontend: process.env.FRONTEND_URL || 'http://localhost:5500',
  port: process.env.PORT || 5000
};
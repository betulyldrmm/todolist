// Bu dosya ne ise yarar?
// PostgreSQL baglantisini tek bir yerden yonetir ve diger dosyalara pool olarak verir.

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Pool, her sorgu icin tekrar tekrar yeni baglanti acmak yerine baglanti havuzu kullanir.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default pool;

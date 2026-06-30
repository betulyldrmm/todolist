// Bu dosya ne ise yarar?
// Express uygulamasini baslatir, middleware'leri ekler ve route dosyalarini baglar.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Frontend'in backend'e istek atabilmesi icin CORS acilir.
app.use(cors());

// JSON body okumak icin gerekir. Bu olmazsa req.body undefined gelir.
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Staj Hazirlik Gorev Takip API calisiyor.' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} adresinde calisiyor.`);
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToServer } from './db/conn.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes (if you have any)
app.use('/', router);

// Connect to MongoDB, then start server
const port = process.env.PORT || 5000;
connectToServer().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

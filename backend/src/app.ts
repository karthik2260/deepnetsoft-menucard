import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDatabase';
import { corsOption } from './config/cors.Config';
import menuroutes from './route/menuRoutes';
import itemRoutes from './route/itemRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(cors(corsOption));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use('/api/menus', menuroutes);
app.use('/api/items', itemRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
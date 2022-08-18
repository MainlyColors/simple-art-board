import express from 'express';
import * as dotenv from 'dotenv';

import { connectDb } from './config/db.js';

// Load Config
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || PORT;
app.listen(PORT, (err) => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

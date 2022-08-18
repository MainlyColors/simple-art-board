import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load Config
dotenv.config({ path: './config.env' });

export async function connectDb() {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);

    // property from mongoose http://localhost:3000/ === localhost
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log('💣💣💣BANG BANG ERROR💣💣💣');
    console.error(err);

    // The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code.
    // 1 === failure
    // this is a force end of the event loop but doesn't stop async tasks
    process.exit(1);
  }
}

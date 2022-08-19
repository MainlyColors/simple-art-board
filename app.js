import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import * as expHandleBars from 'express-handlebars';
import { connectDb } from './config/db.js';

import router from './routes/index.js';

// Load Config
dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();

// *****************
// express app settings
// *****************

// normally Handlebars like this
// app.engine('handlebars', expHandleBars.engine());
app.engine('hbs', expHandleBars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// *****************
// middleware
// *****************

if (process.env.NODE_ENV === 'development') {
  // logs server requests
  app.use(morgan('dev'));
}

// *****************
// routes
// *****************
// used on all endpoints
app.use('/', router);

const PORT = process.env.PORT || PORT;
app.listen(PORT, (err) => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

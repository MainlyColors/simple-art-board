import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import * as expHandleBars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import { connectDb } from './config/db.js';
import MongoStore from 'connect-mongo';

import router from './routes/index.js';
import authRouter from './routes/auth.js';
import storiesRouter from './routes/stories.js';

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport config
import { startPassport } from './config/passport.js';
startPassport(passport);

connectDb();

const app = express();

// *****************
// express app settings
// *****************

// Handlebars Helpers
import { formatDate, truncate, stripTags } from './helpers/hbs.js';

// normally Handlebars like this
// app.engine('handlebars', expHandleBars.engine());
app.engine(
  'hbs',
  expHandleBars.engine({
    extname: '.hbs',
    helpers: { formatDate, truncate, stripTags },
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

// *****************
// middleware
// *****************

// Session
// express-session used to keep session data between page loads
app.use(
  session({
    // This is the secret used to sign the session ID cookie.
    // The secret itself should be not easily parsed by a human and would best be a random set of characters
    secret: 'cat',
    // Forces the session to be saved back to the session store, even if the session was never modified during the request. false === dont save
    resave: false,
    /*
    Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.
    */
    // don't create a session until session is stored
    saveUninitialized: false,
    // wont work without HTTPS
    // cookie: { secure: true }
    // will check database for the auth already being there
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('public'));

// Body parser for form input & JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // logs server requests
  app.use(morgan('dev'));
}

// *****************
// routes
// *****************
// used on all endpoints
app.use('/', router);
// used on all auth endpoints
app.use('/auth', authRouter);

// used for all stories
app.use('/stories', storiesRouter);

const PORT = process.env.PORT || PORT;
app.listen(PORT, (err) => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

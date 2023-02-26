const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const path = require('path');
const PORT = process.env.PORT || 3000;

// DB Config
const dbURI = 'mongodb+srv://csvfilecheckernodejs-user:csvfilecheckernodejs-user@cluster0.lzeuen4.mongodb.net/Bank?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(session({
  name: 'Zable',
  //ToDo change the secret before the deployament
  secret:'blahh_blahh_bllaahh',
  saveUninitialized:false,
  resave:false,
  cookie:{
      maxAge:(1000*60*100)
  },
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://csvfilecheckernodejs-user:csvfilecheckernodejs-user@cluster0.lzeuen4.mongodb.net/Bank?retryWrites=true&w=majority',
      autoRemove: 'disabled',
      }),
      function(err){
          console.log(err || 'connect-mongodb setup ok');
      }
}))

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user;
  next();
});

// Routes
// set up routes
// const indexRouter = require('./routes/index');
// const signupRouter = require('./routes/signup');
// const signinRouter = require('./routes/signin');
// const dashboardRouter = require('./routes/dashboard');
// app.use('/', indexRouter);
// app.use('/signup', signupRouter);
// app.use('/signin', signinRouter);
// app.use('/dashboard', dashboardRouter);
app.use('/',require('./routes/index')) // route always below the passport

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

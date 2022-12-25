require("dotenv").config();
require("./config/db")();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const isAdmin = require("./middleware/isAdmin");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");
const session = require("express-session")

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const portfolioRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin/admin');
const adminAboutRouter = require('./routes/admin/about');
const adminSkillsRouter = require('./routes/admin/skills');
const adminTechnologyRouter = require('./routes/admin/technology');
const adminProjectsRouter = require('./routes/admin/projects');
const adminNetworksRouter = require('./routes/admin/networks');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))


app.use(require('connect-flash')());

// passport js        
const passport = require("passport");
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("*", (req, res, next) => {
  res.locals.user = req.user || null
  next();
})

app.use((req, res, next) => {
  if(!req.session.lang) req.session.lang = "ru"
  if(req.query.lang) req.session.lang = req.query.lang;

  const file = "./config/lang/" + req.session.lang + ".json"

  fs.readFile(file, (err, data) => {
    if(err) res.send("Error loading language file: " + file);
    else {
      l = JSON.parse(data);
      lang = req.session.lang;
      next();
    }
  })

})


app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/', portfolioRouter);
app.use('/', usersRouter);
app.use('/admin', isAdmin, adminRouter);
app.use('/admin', adminAboutRouter);
app.use('/admin', adminSkillsRouter);
app.use('/admin', adminTechnologyRouter);
app.use('/admin', adminProjectsRouter);
app.use('/admin', adminNetworksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(lang === "en") {
    req.flash("danger", "This page cannot be found")
    res.render("error", {title: "This page cannot be found", error: true, home: "Go to home page"})
  } else {
    req.flash("danger", "Эта страница не найдена");
    res.render("error", {title: "Эта страница не найдена", error: true, home: "Перейти на главную страницу"})
  }
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

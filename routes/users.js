const { Router } = require('express');
const router = Router();
const Networks = require('../models/Networks');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const passport = require("passport");


router.get('/user', async (req, res, next) => {
  const networks = await Networks.find({});
  const loginImg = "/img/login2.png";
  res.render("user", { title: "Sign In", networks, footerStyle: true, loginImg })
});


router.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password
  })

  bcrypt.genSalt(10, (err, pass) => {
    if (err) console.log(err);
    bcrypt.hash(user.password, pass, (err, hash) => {
      if (err) console.log(err);
      else {
        user.password = hash;
        user.save(err => {
          if (err) throw err;
          else {
            req.flash("success", "Muvaffaqiyatli ruyhatdan o'tdingiz");
            res.redirect("/")
          }
        })
      }
    })
  })
})


router.post("/login",
  [
    check("email").isEmail().withMessage("Ваш адрес электронной почты неверен").normalizeEmail(),
    check("password").isLength({ min: 8, max: 15 }).withMessage("Ваш пароль должен содержать от 8 до 15 символов")
  ],
  async (req, res, next) => {
    let errors = validationResult(req);
    let handler = !errors.isEmpty();
    const { email, password } = req.body;
    if (handler) {
      const networks = await Networks.find({});
      if (lang === "ru") {
        res.render("user", { title: "Login error", errors: errors.errors, networks, email, password })
      } else {
        const errNot = [];

        if(email === "@") {
          const emailErr = {
            value: undefined,
            msg: 'Your email address is incorrect',
            param: 'email',
            location: 'body'
          }
          errNot.push(emailErr);
        }

        if (!password) {
          const passwordErr = {
            value: undefined,
            msg: 'Your password must contain between 8 and 15 characters',
            param: 'password',
            location: 'body'
          }
          errNot.push(passwordErr);
        }

        res.render("user", { title: "Login error", errors: errNot, networks, email, password })
      }
    }
    else {
      passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/user",
        failureFlash: true,
      })(req, res, next);
    }
  })

router.get("/logout", (req, res, next) => {
  req.logout(async function (err) {
    if (err) {
      return next(err);
    }
    const networks = await Networks.find({});
    req.flash("success", "Вы вышли из системы")
    res.render('index', {title: "Home", networks});
  });
})


module.exports = router;

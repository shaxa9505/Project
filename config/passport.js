const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const errImg = "/img/no.png"

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if(err) {
                return done(err)
            }

            if(!user) {
                return done(null, false, {errImg, type: "danger", message: lang === "ru" ? "Извините, доступ есть только у администратора" : "Sorry, only admin has access"})
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    return done(err)
                }
                if(!isMatch) {
                    return done(null, false, {errImg, type: "danger", message: lang === "ru" ? "Извините, доступ есть только у администратора" : "Sorry, only admin has access"})
                }
                
                else {
                    return done(null, user, { user })
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}
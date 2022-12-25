const isAdmin = (req, res, next) => {
    if(!req.isAuthenticated()) {
        if(lang === "ru") {
            req.flash("danger", "Извините сначала войдите в систему");
            res.redirect("/user")
        } else {
            req.flash("danger", "Sorry, please login first");
            res.redirect("/user")
        }
    }
    else if(req.isAuthenticated() && req.user.role === "admin") {
        req.flash("success", "Вы вошли в систему");
        next();
    }
}


module.exports = isAdmin;
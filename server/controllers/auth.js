exports.login = async (req, res, next) => {
    res.render("login.hbs", {title: "Login Page"});
};

exports.logout = async (req, res, next) => {
    res.render("logout.hbs", {title: "Logout Page"});
};
exports.logoutUser = async (req, res, next) => {
    req.logout(err => {
        if (err) {return next(err);}
        res.redirect('/auth/login');
    })
};
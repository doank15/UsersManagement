const express = require('express');
const authRoutes = express.Router();
const auth = require("../controllers/auth");
const passport = require('passport');


// login routes
// redirect to login page
authRoutes.get("/auth/login", auth.login);
authRoutes.get('/auth/google', passport.authenticate('google', {scope: ['email']}));
authRoutes.get("/oauth2/redirect/google", passport.authenticate('google', {failureRedirect: "/auth/login"}), 
async function (req, res) {
    req.session.user = req.user;
    res.redirect('/');
});
authRoutes.post('/auth/login', passport.authenticate('google ', {successRedirect: '/', failureRedirect: '/auth/login'}))

// logout routes
authRoutes.get('/auth/logout',auth.logout);
authRoutes.post('/auth/logout', auth.logoutUser);


module.exports = authRoutes;
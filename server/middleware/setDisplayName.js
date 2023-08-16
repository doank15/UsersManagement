function setDisplayName(req, res, next){
    if (req.session && req.session.user) {
      res.locals.currentUser = req.session.user;
      next();
    }
    else {
      next();
    }
}
module.exports = setDisplayName;
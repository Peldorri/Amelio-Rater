var express=require('express');
var authRouter= express.Router();
var mongodb= require('mongodb').MongoClient;
var fs = require('fs');

var router= function (passport){
  var authRouter= express.Router();

  authRouter.get('/user/login', function (req,res,next) {
    fs.readFile('../Amelio-rater/Views/loginForm.html', function (err, html) {
      if (err) {
          throw err;
      }
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
});
  }).post('/user/authlogin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(200).json({})}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          return res.status(200).json(user);
      });
    })(req, res, next);
  });

  authRouter.post('/consumer/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(200).json({})}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          return res.status(200).json(user);
      });
    })(req, res, next);
  });

      return authRouter;

}
module.exports = router;

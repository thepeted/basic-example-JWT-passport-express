const express = require("express")
const bodyParser = require("body-parser")

const jwt = require('jsonwebtoken')
const passport = require("passport")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// express setup
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next();
})

// passport middleware
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = 'bonbonbonbons'

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log('payload received by API', jwtPayload)  
  if (jwtPayload.name) {
    console.log('payload received in API')
    next(null, jwtPayload.name)
  } else {
    next(null, false)
  }
})
passport.use(strategy)

// protected route
app.get("/resource", passport.authenticate('jwt', { session: false }), function(req, res){
// user name added from jwt payload to request via strategy middleware
  res.json("API resource accessed by user " + req.user + " with token");
});

app.listen(3010, function() {
  console.log("listening on port 3010")
})
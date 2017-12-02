const express = require("express");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const fakeDB = require("./fakeDatabase");

// express setup
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("public"));

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "bonbonbonbons";

// passport middleware
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  console.log("payload received in main", jwtPayload);
  if (jwtPayload.name) {
    next(null, jwtPayload.name);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

// login endpoint
app.post("/login", function(req, res) {
  // parse user input from login form
  const name = req.body.name;
  const password = req.body.password;

  // authenticate user by checking submitted username / password
  const user = fakeDB(name);

  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }
  if (user.password === req.body.password) {
    // create and send token
    const payload = { name: user.name };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

// protected route
app.get("/secret", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  // user name added from jwt payload to request via strategy middleware
  res.json("Main resource accessed by user " + req.user + " with token");
});

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});

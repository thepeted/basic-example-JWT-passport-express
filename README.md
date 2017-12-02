# Simple JWT example with express and passport.js

A very basic implementation of using [Passport](http://www.passportjs.org/) and
[Express](https://expressjs.com/), demoing a client being issued a JSON Web
Token (JWT) and then using the token to access otherwise protected resources.

Note that resource.js is an entirely seperate application to `main.js`, however
it will accept the JWT provided by `main.js` because it has been signed using
the same `secretOrKey` option.

## Requirements

node.js environment

## Usage

1. `> npm install`
2. `> npm run main.js & npm run resource.js`
3. Browse to localhost:3000
4. Obtain a token using valid credentials (see fakeDatabase.js).
5. Token is stored in the DOM.
6. You can now access the secret resources.

const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const User = require ('../src/models/User.js');
const myKey = require ('../setup/db.js');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken ();
opts.secretOrKey = myKey.secret;

module.exports = passport => {
  passport.use (
    new JwtStrategy (opts, (jwt_payload, done) => {
      User.findById (jwt_payload.id)
        .then (user=> {
          if (user) {
            return done (null, user);
          }
          return done (null, false);
        })
        .catch (err => console.log (err));
    })
  );
};

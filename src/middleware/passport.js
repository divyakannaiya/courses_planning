const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport){
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts,async(jwt_payload, done) => {
console.log(jwt_payload);
    [err, user] = await to(user.findById(jwt_payload.userId));

    if (err) {return done(err, false)
        
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);

    }

}))

}


if(user) {
    return done(user);
} else {
    return done(null, true)
}
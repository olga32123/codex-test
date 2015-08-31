var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var localStrategy = function(db){
    return new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            console.log('log:', email, password);

            db.users.findOne({
                email: email
            }).exec(function (err, user) {
                console.log('err', err);
                console.log('user', user);
                
                if (err) {
                    return done(err);
                }
                
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email/apssword'
                    });
                }

                return done(null, user);
            });
        }
    )    
} 

var init = function(app){
    var db = app.db;

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            console.log('log:', email, password);

            db.users.findOne({
                email: email
            }).exec(function (err, user) {
                console.log('err', err);
                console.log('user', user);
                
                if (err) {
                    return done(err);
                }
                
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email/apssword'
                    });
                }

                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        console.log('user', user);

        done(null, user.id);
    });

    passport.deserializeUser(function (data, done) {
        db.users.findOne(data)
            .exec(done);
    });

    app.use(passport.initialize());
    app.use(passport.session());

}

module.exports = {
    init : init,
    getCurrent: function (req, res) {
        res.json(req.user);
    },
    logout: function (req, res) {
        req.logout();
        res.sendStatus(200);
    },
    login: function (req, res, next) {
        passport.authenticate('local', {})(req, res, next);

        // req.login(req.body, function (err) {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.json(req.user);
        // });
    },
    checkAuth: function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
};

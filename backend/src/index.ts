//this is the file that it starts my app
import User, { IUser } from './models/user';
import database from './database';
import session from 'express-session';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//to commit
import app from './server';
import passport from "passport";

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
        }
    }))

app.use(passport.initialize());
app.use(passport.session());

// @ts-ignore
passport.serializeUser((user: IUser, done: any) => {
    return done(null, user._id);
});

passport.deserializeUser((id: string, done: any) => {

    User.findById(id, (err: Error, doc: IUser) => {
        // Whatever we return goes to the client and binds to the req.user property
        return done(null, doc);
    })
})

passport.use(new GoogleStrategy({
        clientID: "769302200300-fbhuhmvis40o4evi55757jp3fej15tek.apps.googleusercontent.com",
        clientSecret: "gnLV_f1aIVzXsp93UqHZCSpz",
        callbackURL: "/api/users/google/getGoogleAuthCallback"
    },
    function (_: any, __: any, profile: any, cb: any) {
        //console.log(profile);
        User.findOne({ userName: profile.name.givenName }, async (err: Error, doc: IUser) => {

            if (err) {
                return cb(err, null);
            }

            if (!doc) {
                const newUser = new User({
                    id: profile.id,
                    signUpWithGoogle: true,
                    userName: profile.name.givenName,
                    password: profile.id,
                    email: profile.emails[0].value
                });

                await newUser.save();
                cb(null, newUser);
            }
            cb(null, doc);
        })

    }));

app.get('/api/users/google/getGoogleAuthRequest', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/users/google/getGoogleAuthCallback',
    passport.authenticate('google', { failureRedirect: 'https://localhost:4000', session: true }),
    function (req, res) {
        res.redirect('http://localhost:8000');
    });


app.listen(app.get('port'), () => {
    //Express Application
    console.log(`Server on port: ${app.get('port')}`);
    //Database connection
    console.log(`Using mongoDB version: ${database.version}`);
});

import express from "express"
import mongoose from "mongoose"
import user from "./routes/user"
import User from "./models/user"
import post from "./routes/post"
import { middleware_error } from "./middlewares/middle"

import session from "express-session"
// import MongoStore ""
// const MongoStore = require('connect-mongo')('session');
// const MongoStore = require('connect-mongo')('session');

// NEW
/**
 * 패스포트 관련 require
 */
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
// let LocalStrategy = LocalStrategys.Strategy
// const LocalStrategy = require('passport-local').Strategy;

const app = express();
// require('dotenv').config();
import Dotenv from 'dotenv';
Dotenv.config();

// console.log(process.env.a === '1')

// async : await가 사용될거라는걸 미리 알려줌
// await : promise가 완료되길 기다림

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Successfully connected to mongodb'))
//     .catch(e => console.error(e));
// }
// connectDB();

console.log('11111')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
    // , store: sessionStore
}));

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user',
            passwordField: 'pw'
        },
        function (username, password, cb) {
            User.findOne({ name: username })
                .then((user) => {
                    if (!user) {
                        return cb(null, false, { message: 'Incorrect username.' })
                    }
                    if (user.password !== password) {
                        return cb(null, false, { message: 'Incorrect password.' })
                    }
                    else {
                        return cb(null, user, { message: 'Success.' })
                    }
                })
                .catch((err) => {
                    cb(err);
                });
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    })
})
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.user)
    res.send(req.user)
});

app.get('/login/user', (req, res, next) => {    
    console.log(req.user)
    res.send(req.user)
});

app.get('/tracking-route', (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }

    res.send("<p>View Count is: " + req.session.viewCount + "</p>");
});

app.use('/user', user);
app.use('/post', post);
app.use(middleware_error);


app.listen(3000, () => console.log("Listening on port 3000..."));

console.log('22222')


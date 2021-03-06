// import {middleware, middleware2} from "../middlewares/middle"
// const middles = require('../middlewares/middle')
// const router = require("express").Router();
// const User = require('../models/user');

// 미들웨어 어떻게 가져옴...? 계속 에러 남
import { middleware, middleware2 } from "../middlewares/middle"
import routers from "express"
import User from "../models/user"
let router = routers.Router();

router.get("/sample", (req, res, next) => {
    next('야 에러다111111111111')
});

router.post("/", (req, res, next) => {
    let user = {
        name: req.body.name,
        phone_number: req.body.phone_number,
        gender: req.body.gender
    };
    // 비구조화 문법
    // let {name, phone_number, gender } = req.body;

    let user1 = new User(user)

    user1.save(function (err, user) {
        if (err) {
            next('User Error')
        } else {
            console.log('성공')
            res.status(200).send(user1)
        }
    })
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id, function (err, output) {
        if (err) {
            next('DB Error')
        } else {
            console.log('성공 : ', output)
            res.send(output)
        }
    })
});

router.delete("/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id, function (err, output) {
        if (err) {
            next('DB Error')
        } else {
            console.log('성공 : ')
            res.status(204).send()
        }
    })
});

router.put("/:id", (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, output) {
        if (err) {
            next('뭔가 Error')
            // console.log('실패 : ', err)
        } else {
            console.log('성공 : ')
            res.status(204).send()
        }
    })
});

// module.exports = router;
export default router;
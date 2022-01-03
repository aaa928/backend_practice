// import {middleware, middleware2} from "../middlewares/middle"
// const middles = require('../middlewares/middle')
// const router = require("express").Router();
// const User = require('../models/user');

// 미들웨어 어떻게 가져옴...? 계속 에러 남
import { middleware, middleware2 } from "../middlewares/middle"
import routers from "express"
import User from "../models/user"
let router = routers.Router();

router.post("/", middleware, (req, res) => {

    let user = {
        name: req.body.name,
        phone_number: req.body.phone_number,
        gender: req.body.gender
    };

    let user1 = new User(user)

    user1.save(function (err, user) {
        if (err) {
            console.log('실패 : ', err)
        } else {
            console.log('성공')
            res.status(200).send(user1)
        }
    })
});

router.get("/:id", (req, res) => {
    // async 랑 await 는 언제 넣어줘야하는지?
    // console.log('dddddddddddddddd' + req.params)
    User.findById(req.params.id, function (err, output) {
        if (err) {
            console.log('실패 : ', err)
        } else {
            console.log('성공 : ', output)
            res.send(output)
        }
    })
});

router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, function (err, output) {
        if (err) {
            console.log('실패 : ', err)
        } else {
            console.log('성공 : ')
            res.status(204).send()
        }
    })
});

router.put("/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, output) {
        if (err) {
            console.log('실패 : ', err)
        } else {
            console.log('성공 : ')
            res.status(204).send()
        }
    })
});

// module.exports = router;
export default router;
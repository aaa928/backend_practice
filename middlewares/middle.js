// const User = require('../models/user');
import User from "../models/user"

let middleware = function (req, res, next) {
    // console.log(req.params.id)
    if (req.params.id.length !== 24) {
        res.send(400)
    } else {
        console.log('미들웨어 성공')
        // req.test = 'TEST'
        next()
    }
}

let middleware2 = function (req, res, next) {
    User.findById(req.params.id, function (err, output) {
        if (err) {
            console.log('몽고DB에 ID 없음 : ', err)
            res.send(400)
        } else {
            console.log('몽고DB에 ID 있음(middleware2) : ', output)
            next()
        }
    })
}

export { middleware, middleware2 }
// module.exports = {middleware, middleware2}
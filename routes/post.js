// import middles from "../middlewares/middle"
import routers from "express"
import Post from "../models/post"
import axios from "axios"
// import { middleware, middleware2 } from "../middlewares/middle"

let router = routers.Router();

// const middles = require('../middlewares/middle')
// const router = require("express").Router();
// const User = require('../models/post');

router.post("/", (req, res, next) => {

    let post = {
        user: req.body.user,
        title: req.body.title,
        body: req.body.body
    };

    let posts = new Post(post)

    posts.save(function (err, output) {
        if (err) {
            next('Post Error')
        } else {
            console.log('게시글 저장 성공 : ', output)
            res.status(200).send(posts)
        }
    })
});

router.get("/:user", (req, res, next) => {
    Post.findById(req.params.user, function (err, output) {
        if (err) {
            // let a = {
            //     HTTP_CODE : 400,
            //     CODE : -601,
            //     MSG : "dfdfdf"
            // }
            next('Post Error11111111')            
        } else {
            console.log('게시글 조회 성공 : ', output)
            res.status(200).send(output)
        }
    })
});

router.delete("/:user", (req, res, next) => {    
    Post.findByIdAndDelete(req.params.user, function (err, output) {
        if (err) {
            next('Post Error')
        } else {
            console.log('게시글 삭제 성공')
            res.status(204).send()
        }
    })
});

router.put("/:user", (req, res, next) => {
    Post.findByIdAndUpdate(req.params.user, { title: req.body.title }, function (err, output) {
        if (err) {
            next('Post Error')            
        } else {
            console.log('게시글 제목 바꾸기 성공 : ')
            res.status(204).send()
        }
    })
});

router.put("/test/:postid", (req, res) => {
    axios
        .get('https://jsonplaceholder.typicode.com/posts/' + req.params.postid)
        .then(response => {

            let post = {
                user: '61add3bde1d0ae69d95951a9',
                title: response.data.title,
                body: response.data.body
            };

            let posts = new Post(post)
            posts.save(function (err, output) {
                if (err) {
                    console.log('게시글 저장 실패 : ', err)
                } else {
                    console.log('게시글 저장 성공 : ')
                    res.status(200).send(posts)
                }
            })
        })
});

router.post("/test2", (req, res) => {
    Post
        .findById(req.body.postid)
        .populate('user')
        .then(
            result => {
                console.log(result)
                res.status(200).send(result)
            }
        )
});

// module.exports = router;
export default router;
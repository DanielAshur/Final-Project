const express = require('express')
const router = express.Router();


const Post = require('../models/postsModel')


router.route('/')
    .get(function (req, resp) {
        Post.find({}, function (err, posts) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(posts)
        })
    })

router.route('/:id')
    .get(function (req, resp) {
        var id = req.params.id;

        Post.findById(id, function (err, post) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(post)
        })
    })

router.route('/')
    .post(function (req, resp) {

        var post = new Post({
            userId: req.body.userId,
            title: req.body.title,
            body: req.body.body
        });

        post.save(function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(post)
        })

    })

router.route('/:id')
    .put(function (req, resp) {
        var id = req.params.id;
        var obj = {
            title: req.body.title,
            body: req.body.body
        }

        Post.findByIdAndUpdate(id, obj, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(obj)
        })
    })

router.route('/:id')
    .delete(function (req, resp) {
        var id = req.params.id;
        Post.deleteMany({ userId: id }, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(id)
        })
    })


module.exports = router;
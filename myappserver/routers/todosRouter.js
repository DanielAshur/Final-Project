const express = require('express')
const router = express.Router();


const Todo = require('../models/todosModel')


router.route('/')
    .get(function (req, resp) {
        Todo.find({}, function (err, todos) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(todos)
        })
    })

router.route('/:id')
    .get(function (req, resp) {
        var id = req.params.id;

        Todo.findById(id, function (err, todo) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(todo)
        })
    })

router.route('/')
    .post(function (req, resp) {

        var todo = new Todo({
            userId: req.body.userId,
            title: req.body.title,
            completed: req.body.completed
        });

        todo.save(function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(todo)
        })

    })

router.route('/:id')
    .put(function (req, resp) {
        var id = req.body._id;
        var obj = {
            _id: req.body._id,
            userId: req.body.userId,
            title: req.body.title,
            completed: req.body.completed
        }

        Todo.findByIdAndUpdate(id, obj, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(obj)
        })
    })

router.route('/:id')
    .delete(function (req, resp) {
        var id = req.params.id;
        Todo.deleteMany({ userId: id }, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(id)
        })
    })


module.exports = router;
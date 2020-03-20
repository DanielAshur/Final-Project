const express = require('express')
const router = express.Router();


const Person = require('../models/personsModel')


router.route('/')
    .get(function (req, resp) {
        Person.find({}, function (err, pers) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(pers)
        })
    })

router.route('/:id')
    .get(function (req, resp) {
        var id = req.params.id;

        Person.findById(id, function (err, per) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(per)
        })
    })

router.route('/')
    .post(function (req, resp) {

        var p = new Person({
            name: req.body.name,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode
            }
        });

        p.save(function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(p)
        })

    })

router.route('/:id')
    .put(function (req, resp) {
        var id = req.params.id;
        var obj = {
            name: req.body.name,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode
            }
        }

        Person.findByIdAndUpdate(id, obj, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(id)
        })
    })

router.route('/:id')
    .delete(function (req, resp) {
        var id = req.params.id;
        Person.findByIdAndDelete(id, function (err) {
            if (err) {
                return resp.send(err)
            }
            return resp.json(id)
        })
    })


module.exports = router;
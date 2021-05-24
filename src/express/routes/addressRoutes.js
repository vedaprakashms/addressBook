const express = require('express')
const router = express.Router()
const address = require('../models/addressModel')
//get all address
router.get('/', async (req, res) => {
    address
        .find()
        .then((r) => {
            res.json({
                totalCount: r.length,
                address: r,
            })
        })
        .catch((e) => {
            res.status(500).json({ message: e.message })
        })
})
// add address to DB
router.post('/', async (req, res) => {
    const adrs = new address({
        fname: req.body.fname,
        lname: req.body.lname,
        surname: req.body.surname,
        mobile1: req.body.mobile1,
        Mobile2: req.body.Mobile2,
        landline: req.body.landline,
        doorNo: req.body.doorNo,
        houseName: req.body.houseName,
        streetName: req.body.streetName,
        road: req.body.road,
        area: req.body.area,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
    })
    adrs.save()
        .then((r) => {
            res.status(201).json(r)
        })
        .catch((e) => {
            res.status(400).json({ message: e.message })
        })
})

//find one address in db
// Getting One
router.get('/:id', getaddress, (req, res) => {
    res.json(res.subscriber)
})

module.exports = router

async function getaddress(req, res, next) {
    let subscriber
    try {
        subscriber = await address.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

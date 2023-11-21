const express = require('express')
const router = express.Router()
const User = require("../models/User")

// @route POST "/api/auth"
// @desc "Add User"
router.post('/', (req, res) => {
    console.log(req.body)
    const newUser = User(req.body)
    newUser.save()
    res.json(req.body)
})

module.exports = router;
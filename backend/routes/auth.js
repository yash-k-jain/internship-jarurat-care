const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

// @route POST "/api/auth"
// @desc "Add User"
router.post('/', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min: 7})
] , (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const newUser = User(req.body)
    newUser.save()
    res.json(req.body)
})

module.exports = router;
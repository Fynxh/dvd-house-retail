const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models').User;

// @route   POST api/auth/user
// @desc    Auth user
// @access  Public
router.post('/user', (req, res) => {
    const {username, password} = req.body;

    // simple validation
    if(!username || !password){
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check for existing user
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist' });

        // validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            level: user.level
                        }
                    })
                }
            )
        })
    })
})

module.exports = router
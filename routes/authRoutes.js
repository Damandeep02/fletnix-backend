const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

router.post('/register', (req, res) => {
  const { email, password, age } = req.body;

  
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      
      const newUser = new User({
        email,
        password,
        age,
      });

      
      newUser.save()
        .then(user => res.json(user))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      
      if (password === user.password) {
        const payload = { id: user.id, email: user.email };
        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
            age: user.age
          });
        });
      } else {
        return res.status(401).json({ password: 'Password incorrect' });
      }
    })
    .catch(error => console.error(error));
});

module.exports = router;

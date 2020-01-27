const User = require('../models/user');
const JWT = require('jsonwebtoken');
const jwtSecret = 'supersecret';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

exports.postRegister = (req, res) => {
    bcrypt.hash(req.body.password, salt)
        .then(hash => {

            const { name, email } = req.body;

            let newUser = {
                name,
                email,
                password: hash
            }

            User.find({ email })
                .then(users => {
                    if (users.length < 1) {
                        User.create(newUser)
                            .then(user => {
                                const token = JWT.sign({
                                    userID: user._id,
                                    name: user.name,
                                    email: user.email
                                }, jwtSecret, { expiresIn: '1h' });

                                res.json({
                                    success: true,
                                    accessToken: token
                                })

                            })
                            .catch(err => {
                                console.log(err);
                                res.json({ success: false })
                            })
                    } else {
                        res.json({
                            success: false,
                            message: 'Email already exists.'
                        })
                    }
                })


        }).catch(err => {
            console.log(err);
            res.json({ success: false })
        });
};


exports.postLogin = (req, res) => {

    User.find({ email: req.body.email })
        .then(users => {
            console.log(users)
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    if (user.password == hash) {
                        console.log('kkk')
                        const token = JWT.sign({
                            userID: user._id,
                            name: user.name,
                            email: user.email
                        }, jwtSecret, { expiresIn: '1h' });

                        res.json({
                            success: true,
                            accessToken: token
                        });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({ success: false });
                })
        })
        .catch(err => {
            console.log(err);
            res.json({ success: false })
        })

};

exports.verifyToken = (req, res) => {
    const decoded = JWT.verify(req.body.token, jwtSecret,
        function (err, decoded) {
            if (err) {
                /*
                  err = {
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                    expiredAt: 1408621000
                  }
                */
                res.json({
                    success: false,
                    message: "Invalid or Expired Token"
                });
            } else {
                res.json({
                    success: true,
                    message: "Token is valid"
                });
            }
        });
}

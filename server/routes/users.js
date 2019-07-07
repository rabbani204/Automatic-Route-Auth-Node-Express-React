var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const Auth = require('../middleware/authMiddleware');


exports.login = (req, res) => {
    req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });
    req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();

    var errors = req.validationErrors();
    if (errors) {
        console.log('Validation error: ', errors);
        res.json({ success: false, error: errors });
    } else {
        User.findAll({
            where: {
                email: req.body.email,
                status: 1,
                IsRemoved:0,
            }
        }).then(user => {
            if (user.length < 1) {
                return res.json({
                    message: "Auth Failed",
                    success: false,
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.json({
                            message: "Auth Failed",
                            success: false,
                        })
                    }
                    if (result) {
                        const jwtTkoen = token.sign({
                            email: user[0].email,
                            id: user[0].user_id,
                            role: user[0].role,
                            status: user[0].status,
                        }, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214", {
                                expiresIn: "30d",
                            })
                        return res.status(200).json({
                            message: "Auth Successful",
                            token: jwtTkoen,
                            role: user[0].role,
                            id: user[0].user_id,
                        })
                    }
                    console.log('result ', result+ 'error is', err);
                    return res.json({
                        message: "Auth Failed",
                        success: false,
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Login Failed",
                message: err,
            })
        })
    }
}

module.exports = router;

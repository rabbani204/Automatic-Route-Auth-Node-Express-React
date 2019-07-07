var express = require('express');
var router = express.Router();
const Route = require('../models/routes');

const UserController = require('../controllers/users');

const Auth = require('../middleware/authMiddleware');

router.get('/', function(req, res, next) {
   res.send("Hello World")
});

router.post('/user/adduser', UserController.adduser);

router.post('/user/login', UserController.login)

router.post('/user/setpermission',Auth, UserController.setpermission)

router.get('/user/list', UserController.alluser)

router.get('/user/routelist', UserController.allroute)


router.get('/admin', Auth, function(req, res, next) {
	res.send("Admin")
});

router.get('/admin/:id', function(req, res, next) {
	res.send("Admin" + req.params.id)
});

router.get('/reseller', function(req, res, next) {
	res.send("Reseller")
});

router.get('/bolgger', function(req, res, next) {
	res.send("Blogger")
});

router.get('/modrator', function(req, res, next) {
	res.send("Modrator")
});


router.post("/routes", (req, res, next) => {
	var routes = [];
	var routeList = [];
	var i = 0;
	router.stack.forEach(function (r) {
	  if (r.route && r.route.path) {
		r.route.stack.forEach(function (type) {
		  var method = type.method.toUpperCase();
		  routes[i++] = {
			no:i,
			method: method.toUpperCase(),
			path: r.route.path
		  };
		})
	  }
	})

	res.json(proute)

	
  });


module.exports = router;

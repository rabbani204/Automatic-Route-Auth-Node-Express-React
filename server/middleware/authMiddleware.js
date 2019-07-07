const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';
const Permission = require('../models/permission');
module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214");
        req.userdata = decoded;
        // next();
    } catch (error) {
        return res.status(404).json({
            message: "Auth Failed",
            success:false,
        })
	}
	
	user = req.userdata;
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	var x = fullUrl.split("api")
	var url = x[1]
	valid = false

	Permission.find({useremail: user.email}).then(result => {
        result.map(v=>{
			console.log(v.routetitle,url,'d')
          if( v.routetitle == url){
			  valid = true;
		  }
		})
		
		console.log(valid, 'valid')
		if( valid == true){
			console.log('yes')
			next();
		}

		else{
			console.log('no')
			return res.status(404).json({
				message: "Auth Failed",
				success:false,
			})
		}
	})
} 
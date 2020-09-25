var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {	
	req.session.user = false;
	res.write("LOGOUT");
	res.end();
});



module.exports = router;
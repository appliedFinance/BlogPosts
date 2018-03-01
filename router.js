const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const say = (s) => {console.log(s);};
function makeText(n) {
	let cc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let s = "";
	while(n>0) 
	{
		s += cc[Math.floor(Math.random()*cc.length)];
		if (n % 5 == 0) { s+= " "; }
		else if (n % 17 == 0) { s+= ". "; }
		--n;
	}
	s += ".";
	return s;
}

BlogPosts.create(
		"What to do If",
		makeText(242),
		"Big Jim");
BlogPosts.create(
		"Ok, Then this Happened",
		makeText(242),
		"Mr. Jim");


router.get("/",  (req,res) => { 
	res.json( BlogPosts.get() );

});


module.exports = router;





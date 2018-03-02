const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

const say = (s) => {console.log(s);};
function makeText(n) {
	let cc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let s = "";	while(n>0) { s += cc[Math.floor(Math.random()*cc.length)];
		if (n % 5 == 0) { s+= " "; } else if (n % 17 == 0) { s+= ". "; } --n;
	} s += ".";
	return s;
}
BlogPosts.create("What to do If", makeText(24),	"Big Jim");
BlogPosts.create("Ok, Then this Happened", makeText(22), "Mr. Jim");


// GET /blog-posts
router.get("/", (req,res)=>{ res.json(BlogPosts.get()); });

// POST /blog-posts
router.post("/", jsonParser, (req,res) => {
	// make user require keys exist in .body
	const requiredKeys = ["title","content","author"];
	requiredKeys.forEach( t => {
		if( !(t in req.body) )
		{
			const message = `Missing "${t}" in request body`;
			say(message);
			return res.status(400).send(message);
		}
	});
	const newpost = BlogPosts.create( req.body.title,
			req.body.content,
			req.body.author );
	res.status(201).json(newpost);
});

// PUT /blog-posts/:id
router.put("/:id", jsonParser, (req,res) => {
	const {id} = req.params;
	const requiredKeys = ["id","title","content","author","publishDate"];

	// check for all required keys
	requiredKeys.forEach( t => {
		if( !(t in req.body) ) {
			const message = `Missing "${t}" in update body`;
			say(message);
			return res.status(400).send(message);
		}
	});

	// check the id
	if (id !== req.body.id) {
		const message = `ID mis-match: "${id}" != "${req.body.id}"`;
		say(message);
		return res.status(400).send(message);
	}

	// update the post
	const updatedpost = BlogPosts.update(
			{  "id": 		id,
				"title": 	req.body.title,
				"content": 	req.body.content,
				"author":  	req.body.author,
				"publishDate":  req.body.publishDate
			});
	say("UPDATED: " + JSON.stringify(updatedpost));
	res.status(204).end();
});


// DELETE /blog-posts/:id
router.delete("/:id", (req,res) => {
	BlogPosts.delete(req.params.id);
	say(`Deleted post with id "${req.params.id}"`);
	res.status(204).end();
});


module.exports = router;

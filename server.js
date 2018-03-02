const express = require('express');
const morgan = require('morgan');

const blogPostRouter = require('./Routes/router');
const app = express();

app.use(morgan('dev'));
app.use(express.static('Public'));
app.use("/blog-posts", blogPostRouter);

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/Views/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log(`Your app is listening on port ${process.env.PORT || 8080}`));





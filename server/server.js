//* create a simple express server that will serve up the public directory in production,
// do this because using live-server for production is not a great idea (it takes up too many resources)

//* 1. yarn add express@(versionNumber)

//* 2. . import express
const express = require('express');

//* 3. . create a new express app
const app = express();

//* 4. tell it where the public folder is
// a) pass into app.use() the code that runs for each request, express.static
// b) call express.static with the path to the public folder
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

//* 5. set up a function to run when someone makes a get request to our             server
// a) call .get() with the path
// b) the path could be '/create', '/help', '/whatever', etc
// c) for us it will be '*', which says to match all unmatched routes
// d) essentially, if it's in the public folder, we will serve that up, it         it's not, we will serve up the same thing every single time
// e) also pass in the function to run
app.get('*', (req, res) => {
    // send the file back
    res.sendFile(path.join(publicPath, 'index.html'));
});

//* 6. start up the server
// a) tell it which port to listen to
// b) pass a callback function which is called when the server is up
app.listen(3000, () => console.log('it works'));

//* 7. via the command line:
// (make sure you have a production build ready, yarn run build:prod )
// node server/server.js

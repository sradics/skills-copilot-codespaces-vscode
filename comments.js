// Create web server
// run: node comments.js
// Then, open in browser: http://localhost:8080/

// Import modules
var http = require('http');
var fs = require('fs');
var url = require('url');

// Create web server
http.createServer(function (req, res) {
    // Parse the request
    var parsedUrl = url.parse(req.url, true);
    var queryAsObject = parsedUrl.query;

    // Get the comments
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err }));
        } else {
            var comments = JSON.parse(data);
            if (queryAsObject.comment) {
                comments.push(queryAsObject.comment);
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    if (err) {
                        console.

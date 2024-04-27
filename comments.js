// Create web server and listen on port 8080
import http from 'http';
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true);
    if (parsedUrl.pathname === '/comment') {
        if (request.method === 'POST') {
            var body = '';
            request.on('data', function(data) {
                body += data;
            });
            request.on('end', function() {
                var comment = JSON.parse(body);
                comments.push(comment);
                response.end('Comment added');
            });
        } else if (request.method === 'GET') {
            response.end(JSON.stringify(comments));
        }
    } else {
        response.end(fs.readFileSync('index.html'));
    }
});

server.listen(8080);
console.log('Server is listening on port 8080');
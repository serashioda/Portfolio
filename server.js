// Let's build a server!
var express = require('express'),
  // require in our request proxy module
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

// use proxy w/in a function to request github data --> server
var proxyGitHub = function(request, response) {
  console.log('Routing Github request for ', request.params[0]);
  (requestProxy({
    url: 'https://https://api.github.com/' + request.params[0],
    headers: {Authorization: 'token ' + process.env.GITHUB_TOKEN}
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

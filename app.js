var express = require('express')
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var path = require("path")
app.use(bodyParser.json());

app.get('/authorize', function (req, res) {
	var code = req.query.code;
	var state = req.query.state;
	var token_url = "https://github.com/login/oauth/access_token";
	var form_data = {
		client_id : "79a74ecd4f74e041ef36",
		client_secret : "73fa94eb26724dcae9f28743396b4d248e28f350",
		code : code,
		state : state
	}

	request.post({url : token_url,formData :form_data}, function(err, httpResponse, body) {
		var qs = body.split("&")[0];
		var accessToken = qs.split("=")[1];
		res.writeHead(200, {'Set-Cookie' : 'accessToken='+accessToken});
		var s = '<script>window.location.href = "/public/dashboard.html"</script>'
		var x = '<html><head>' + s + '</head><body></body></html>'
		res.end(x);
	});
});

app.post('/events', function(req, res) {
	var body = req.body;
	
	res.end();
})


app.get("/", function(req, res) {
	res.json("hello world");

});

app.use('/public', express.static(path.join(__dirname, 'public')))

var port = process.env.PORT || 3000;
console.log(port);
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

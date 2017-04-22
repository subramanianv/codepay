var express = require('express')
var app = express();
var request = require('request');

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
		res.json({code : code, state : state,body : body});
	});



});

//b8ec11e9245c386ccf31e15d536723baf292a939


app.get("/", function(req, res) {
	res.json("hello world");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

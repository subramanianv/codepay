var Web3 = require('web3');
var web3 = new Web3();
debugger;
web3.setProvider(new web3.providers.HttpProvider());
var JobRegistration = require('./../build/contracts/JobRegistration.sol');
var promise = require('bluebird');
JobRegistration.setProvider(web3.currentProvider);
var jr = JobRegistration.deployed();



function showRepos(error, response) {
	var repos = response.data;
	var repoNames = [];
	for (var i = 0; i < repos.length; i++) {
		repoNames.push(jr.getJobTracker(repos[i].id));
	}

	promise.all(repoNames).then(function(escrows) {
		var template = '<thead><tr><th width="400">Repo</th><th>Token Address</th></thead><tbody>';
		var tds  = '';
		for (var i = 0; i < escrows.length; i++) {
			if (escrows[i].indexOf("0x0") == 0) {
				tds = tds + '<tr><td><b>' + repos[i].name + '</b></td><td><a href="token.html?id=' + repos[i].id + '&name=' + repos[i].name + '">Create token</a></td></tr/>'
			}
			else {
				tds = tds + '<tr><td><b>' + repos[i].name + '</b></td><td><a target="_blank" href="escrow.html?address='+ escrows[i]+ '&id=' + repos[i].id + '&name=' + repos[i].name + '">'+ escrows[i] + '</a></td></tr/>'
			}
		}
		template = template + tds + '</tbody>';
		document.getElementById("repos").innerHTML = template;
	})

	// var template = '<thead><tr><th width="400">Repo</th><th>Token Address</th></thead><tbody>{{#repos}}<tr><td><b>{{name}}</b></td><td><a href="token.html?id={{id}}&name={{name}}">Create token</a></td>{{/repos}}</tbody>'
	// document.getElementById("repos").innerHTML = Mustache.render(template, {repos : repoNames});
}

getRepos(accessToken, showRepos);

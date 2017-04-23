var Web3 = require('web3');
var web3 = new Web3();
debugger;
web3.setProvider(new web3.providers.HttpProvider());
var JobTracker = require('./../build/contracts/JobTracker.sol');

JobTracker.setProvider(web3.currentProvider);
var jt = JobTracker.deployed();

// JobTracker.then(function(JobTrackerInstance) {
// 	getRepos(accessToken, showRepos);
// });

function showRepos(error, response) {
	var repos = response.data;
	var repoNames = [];
	for (var i = 0; i < repos.length; i++) {
		jt.getContractAddress(repos[i].id).then(console.log);
		repoNames.push({id : repos[i].id, name : repos[i].name});
	}

	var template = '<thead><tr><th width="400">Repo</th><th>Token Address</th></thead><tbody>{{#repos}}<tr><td><b>{{name}}</b></td><td><a href="token.html?id={{id}}&name={{name}}">Create token</a></td>{{/repos}}</tbody>'
	document.getElementById("repos").innerHTML = Mustache.render(template, {repos : repoNames});
}

getRepos(accessToken, showRepos);

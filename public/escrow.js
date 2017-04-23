var Web3 = require('web3');
var web3 = new Web3();
debugger;
web3.setProvider(new web3.providers.HttpProvider());
var JobTracker = require('./../build/contracts/JobTracker.sol');
var StandardToken = require('./../build/contracts/StandardToken.sol');
var promise = require('bluebird');
JobTracker.setProvider(web3.currentProvider);
StandardToken.setProvider(web3.currentProvider);





function getUrlVars()
{
var vars = {}, hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
hash = hashes[i].split('=');
vars[hash[0]] = hash[1];
}
return vars;
}
var qs = getUrlVars();
document.getElementById("Account").innerHTML = "Account:" + qs['address'];


var jt = JobTracker.at(qs['address']);

document.getElementById("eth").innerHTML = 'Ether Balance: ' + web3.eth.getBalance(qs['address']).toNumber() + " wei"
// document.getElementById("totalSupply").innerHTML = ""
jt.tokenContractAddress().then(function(token) {
	token= token.toString();
	var st = StandardToken.at(token);
	st.totalSupply().then(function(tss) {
		document.getElementById("totalSupply").innerHTML = "Total Supply:" + tss.toString() + " tokens";
	});
});

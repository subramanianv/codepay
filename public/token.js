var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
var JobTracker = require('./../build/contracts/JobTracker.sol');
var StandardToken = require('./../build/contracts/StandardToken.sol');
var JobRegistration = require('./../build/contracts/JobRegistration.sol');
var tokenInstance;
StandardToken.setProvider(web3.currentProvider);
JobTracker.setProvider(web3.currentProvider);
JobRegistration.setProvider(web3.currentProvider);
var jt = JobTracker.deployed();
var jr = JobRegistration.deployed();
var jtInstance;
function storeContractAddress(id, address) {
	jt.addTokenContract(id, address).then(console.log);
}

$(document).ready(function() {
	$("#accountAddress").val(web3.eth.accounts[0].toString());
});


$("#_createToken").click(function(){
	var _initialAmount = parseInt($("#_initialAmount").val());
	var _tokenName = repoName;
	var _decimalUnits = 2/* var of type uint8 here */ ;
	var _tokenSymbol =  repoName.slice(2)/* var of type string here */ ;
	var escrowAmount = parseInt($("#ether").val());
	debugger;
	StandardToken.new(_initialAmount, {gas : 4712388, from : web3.eth.accounts[0]}).
	then(function(_newToken) {
		var address = _newToken.address;
		console.log("Token Address", _newToken.address);
		tokenInstance =  StandardToken.at(_newToken.address);
		debugger;
		return JobTracker.new(_newToken.address, {value : escrowAmount, gasPrice : 1000, gas : 4712388, from : web3.eth.accounts[0]})
	}).then(function(_jt) {
		jtInstance = JobTracker.at(_jt.address);
		console.log(web3.eth.getBalance(_jt.address).toString());
		return jr.addJobTracker(qs.id, _jt.address, {from : web3.eth.accounts[0]});
	}).then(function() {
		//return true;
		// jtInstance.tokenContractAddress().then(console.log, console.log);
		// jtInstance.jobCreator().then(console.log, console.log);
		console.log(web3.eth.accounts[0], web3.eth.accounts[1]);
		debugger;
		return jtInstance.acceptWork(web3.eth.accounts[1], 10, {gas : 49199000, from : web3.eth.accounts[0]});
	}).then(function(tx) {
		debugger;
		return tokenInstance.balanceOf(web3.eth.accounts[1], {from : "0x84f1bacbb9b2cb1146e3569ea89bf067a932768d"});
	}).then(function(balance) {
		debugger;
		console.log(balance.toString());
		return tokenInstance.balanceOf(web3.eth.accounts[0], {from : web3.eth.accounts[0]});
	}).then(function() {
		debugger;
		return tokenInstance.balanceOf(web3.eth.accounts[0], {from : web3.eth.accounts[0]});
	}).then(function(sb) {
		debugger;
		console.log(web3.eth.getBalance(web3.eth.accounts[1]).toString());
		return jtInstance.payWorker(web3.eth.accounts[1], {from : web3.eth.accounts[0]});
	}).then(function() {
		console.log(web3.eth.getBalance(jtInstance.address).toString());
		console.log(web3.eth.getBalance(web3.eth.accounts[1]).toString());
	});

});

var Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var _totalSupply = 1000000;
var jobtrackerContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"escrows","outputs":[{"name":"tokenContract","type":"address"},{"name":"tokenAmount","type":"uint256"},{"name":"sender","type":"address"},{"name":"receiver","type":"address"},{"name":"fulfill","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"jobCreator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newJobCreator","type":"address"}],"name":"changeJobCreator","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_totalSupply","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"ChangeOwner","type":"event"}]);
var jobtracker = jobtrackerContract.new(
   _totalSupply,
   {
     from: web3.eth.accounts[0],
     data: '0x60606040526000600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503461000057604051602080610505833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b61044a806100bb6000396000f30060606040523615610060576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063083c632314610069578063477230b21461008c578063bc76c7fa14610177578063d97ba5fd146101c6575b6100675b5b565b005b34610000576100766101f9565b6040518082815260200191505060405180910390f35b34610000576100bd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101ff565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019550505050505060405180910390f35b34610000576101846102a2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101f7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102c8565b005b60015481565b60026020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160149054906101000a900460ff16905085565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561041a577f9aecf86140d81442289f667eb72e1202a8fbb3478a686659952e145e85319656600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a180600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b505600a165627a7a72305820bdf8d16cbc0a7118728004981dfa4e823e422aa2050b809d2acbc604e615806a0029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }


    var safemathContract = web3.eth.contract([]);
    var safemath = safemathContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a72305820f5db8b9f5938e78ea0b64d26d96b87f73895da15f87e8d2a90577b9bbeb05a3a0029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
 })

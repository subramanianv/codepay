var Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var _tokenContract = 0x041a12bb1281760a04ab4134a48a041f3f63a45f; //pass address variable through this 
var jobtrackerContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_jobWorker","type":"address"}],"name":"shareOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_jobWorker","type":"address"},{"name":"_amount","type":"uint256"}],"name":"acceptWork","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"jobCreator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newJobCreator","type":"address"}],"name":"changeJobCreator","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_jobWorker","type":"address"}],"name":"payWorker","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenContract","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"ChangeOwner","type":"event"}]);
var jobtracker = jobtrackerContract.new(
   _tokenContract,
   {
     from: web3.eth.accounts[0],
     data: '0x60606040526000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503461000057604051602080610b8a833981016040528080519060200190919050505b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b610a8e806100fc6000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063083c63231461008a57806321e5e2c4146100ad5780634ad0ca9e146100f457806382edaf9414610148578063bc76c7fa14610197578063d97ba5fd146101e6578063ea19375714610219575b6100885b5b565b005b346100005761009761024c565b6040518082815260200191505060405180910390f35b34610000576100de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610252565b6040518082815260200191505060405180910390f35b346100005761012e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506103e6565b604051808215151515815260200191505060405180910390f35b346100005761015561057a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101a46105a0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610217600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105c6565b005b346100005761024a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061071c565b005b60025481565b600060006000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad7a672f6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506103dc6103e88302826109e3565b92505b5050919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561057357600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b5b5b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610718577f9aecf86140d81442289f667eb72e1202a8fbb3478a686659952e145e85319656600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a180600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109de5761079d3073ffffffffffffffffffffffffffffffffffffffff163161079884610252565b610a20565b9050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231876000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190506000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050503073ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050505b5b5b5050565b600060006109f360008411610a52565b8284811561000057049050610a15838581156100005706828502018514610a52565b8091505b5092915050565b600060008284029050610a476000851480610a42575083858381156100005704145b610a52565b8091505b5092915050565b801515610a5e57610000565b5b505600a165627a7a723058204e052f8ba4f8fedaa10fbfde1bc7c918d8b49bf7001f72ee7ade42e3ae1b40050029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
pragma solidity ^0.4.4;
import "./SafeMath.sol";
import "./StandardToken.sol";
contract JobTracker is SafeMath {
    event ChangeOwner(address oldOwner, address newOwner);

    address public tokenContractAddress;
    address public jobCreator = 0x0;
    uint public endBlock;

    modifier onlyJobCreator {
        if (msg.sender == jobCreator) _;
    }

    function JobTracker(address _tokenContract) {
        jobCreator = msg.sender;
        tokenContractAddress = _tokenContract;
    }

    function shareOf(address _jobWorker) constant returns (uint256) {
        uint placeHolder = StandardToken(tokenContractAddress).balanceOf(_jobWorker);
        uint t_Supply = StandardToken(tokenContractAddress).totalBalance();
        return div(placeHolder * 1000, t_Supply);
    }

    function acceptWork (address _jobWorker, uint _amount) onlyJobCreator returns (bool) {
        return StandardToken(tokenContractAddress).transferFrom(jobCreator, _jobWorker, _amount);
    }

    function payWorker (address _jobWorker) onlyJobCreator {
        uint sendBalance = mul(this.balance, shareOf(_jobWorker));
        StandardToken(tokenContractAddress).transferFrom(jobCreator, _jobWorker, StandardToken(tokenContractAddress).balanceOf(_jobWorker));
        if(!this.send(sendBalance)) throw;
    }

    function changeJobCreator (address _newJobCreator) onlyJobCreator {
        ChangeOwner(jobCreator, _newJobCreator);
        jobCreator = _newJobCreator;
    }

    function () payable {}
}
import "./SafeMath.sol";
import "./Token.sol";

pragma solidity ^0.4.8;

contract JobTracker is SafeMath {
    event ChangeOwner(address oldOwner, address newOwner);
    event Accept(address _jobWorker, uint _amount);
    event Paid(address _jobWorker, uint _amount);

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
        uint placeHolder = Token(tokenContractAddress).balanceOf(_jobWorker);
        uint t_Supply = Token(tokenContractAddress).totalBalance();
        return div(placeHolder * 1000, t_Supply);
    }

    function acceptWork (address _jobWorker, uint _amount) onlyJobCreator returns (bool) {
        return Token(tokenContractAddress).transferFrom(jobCreator, _jobWorker, _amount);
        Accept(_jobWorker, _amount);
    }

    function payWorker (address _jobWorker) onlyJobCreator {
        uint sendBalance = mul(this.balance, shareOf(_jobWorker));
        Token(tokenContractAddress).transferFrom(jobCreator, _jobWorker, Token(tokenContractAddress).balanceOf(_jobWorker));
        Paid(_jobWorker, this.send(sendBalance))
        if(!this.send(sendBalance)) throw;
    }

    function changeJobCreator (address _newJobCreator) onlyJobCreator {
        ChangeOwner(jobCreator, _newJobCreator);
        jobCreator = _newJobCreator;
    }

    function () payable {}
}

import "./SafeMath.sol";
import "./Token.sol";

pragma solidity ^0.4.8;

contract JobTracker is SafeMath, Token {
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

    function shareOf(address _jobWorker) constant returns (ufixed) {
        return div (Token(tokenContractAddress).balanceOf(_jobWorker), Token(tokenContractAddress).totalSupply);
    }

    function changeJobCreator (address _newJobCreator) onlyJobCreator {
        ChangeOwner(jobCreator, _newJobCreator);
        jobCreator = _newJobCreator;
    }

    function () payable {}
}

pragma solidity ^0.4.4;

import "./SafeMath.sol";
import "./StandardToken.sol";

contract JobTracker is SafeMath {

    //==========================================
    // TO-DO-TASKS
    //==========================================

    //  SETTERS
    // - tag ACCEPTED github pull requests to token transfers

    //==========================================
    // VARIABLES
    //==========================================

    event ChangeOwner (address oldOwner, address newOwner);
    event AcceptWork (address projectManager, address bountyHunter, uint amount);

    address public tokenContractAddress;
    address publicbountyCreator;
    uint256 public lockBlockNumber;
    uint256 public lockPayAmount;

    StandardToken token;

    struct pullRequestStruct {
        address[] bountHunterAddresses;
        uint256[] tokenBountyAmount;
    }

    // @Dev byte32 matches to 'sha' id of pull requests
    mapping (byte32 => pullRequestStruct) pullRequests;

    //==========================================
    // MODIFIERS
    //==========================================

    modifier onlyBountyCreator {
        if (msg.sender ==bountyCreator) _;
    }

    //==========================================
    // CONSTRUCTOR
    //==========================================

    function JobTracker (address _tokenContract) {
       bountyCreator = msg.sender;
        token = StandardToken(_tokenContract);
        tokenContractAddress = _tokenContract;
        lockBlockNumber = 0;
        lockPayAmount = 0;
    }

    //==========================================
    // GETTERS
    //==========================================

    function shareOf (address _bountyHunter) constant returns (uint256) {
        uint256 placeHolder = tokenBalance(_bountyHunter);
        uint256 t_Supply = StandardToken(tokenContractAddress).totalBalance();
        return div(placeHolder * 1000, t_Supply);
    }

    //==========================================
    // SETTERS
    //==========================================

    //TO-DO-WIP
    function multiTransfer (address[] _bountyHunters, uint256[] _bountyValues) onlyBountyCreator {
        if (_bountyHunters.length != _bountyValues.length) throw;
        for(uint256 i=0; i<_bountyHunters.length; i++) {
            if (!StandardToken(tokenContractAddress).transfer(_tos[i], _values[i])) throw;
        }
    }

    function acceptWork (address _bountyHunter,  uint256 _amount) onlyBountyCreator {
        token.transfer(_bountyHunter, _amount);
        AcceptWork(msg.sender, _bountyHunter, _amount);
    }

    function payWorker (address _bountyHunter) onlyBountyCreator returns (bool) {
        if (this.balance < lockPayAmount || block.number < lockBlockNumber) {
          return false;
        }
        uint256 sendBalance = mul(this.balance, shareOf(_bountyHunter));
        sendBalance = div(sendBalance, 1000);
        if (!_bountyHunter.send(sendBalance)) throw;
        token.approve(_bountyHunter,bountyCreator, token.balanceOf(_bountyHunter));
        token.transferFrom(_bountyHunter,bountyCreator, token.balanceOf(_bountyHunter));

        return true;
    }

    function changeBountyCreator (address _newBountyCreator) onlyBountyCreator {
        ChangeOwner(BountyCreator, _newBountyCreator);
       bountyCreator = _newBountyCreator;
    }

    // @Dev Approve bounty claim from contract address

    function lockPayment () onlyBountyCreator {
        lockPayAmount = this.balance;
        lockBlockNumber = block.number;
    }

    //==========================================
    // MISCELLANEOUS
    //==========================================

    function () payable {}
}

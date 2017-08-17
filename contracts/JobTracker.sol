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
    address public bountyCreator;

    uint256 public lockBlockNumber;
    uint256 public lockPayAmount;

    StandardToken token;

    mapping (address => bool) bountyManagers;

    //==========================================
    // MODIFIERS
    //==========================================

    modifier onlyBountyCreator {
        require(msg.sender == bountyCreator);
        _;
    }

    //==========================================
    // CONSTRUCTOR
    //==========================================

    function JobTracker (address _tokenContract) {
        bountyCreator = msg.sender;
        bountyManagers[msg.sender] = true;
        token = StandardToken(_tokenContract);
        tokenContractAddress = _tokenContract;
        bountyStatus = requestState.Inactive;
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

    function acceptWork (address _bountyHunter,  uint256 _amount) onlyBountyCreator {
        token.transfer(_bountyHunter, _amount);
        AcceptWork(msg.sender, _bountyHunter, _amount);
    }

    function payWorker (address _bountyHunter) onlyBountyCreator returns (bool success) {
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

    function () payable {
        if (bountyStatus == requestState.Inactive) throw;
    }

    //==========================================
    // Work-In-Progress
    //==========================================

    enum requestState {
        Inactive,
        Locked,
        Unlocked
    }

    requestState public bountyStatus;
    uint256 unlockBlockNumber;

    struct pullRequestStruct {
        address[] bountHunterAddresses;
        uint256[] tokenBountyAmount;
    }

    // @Dev byte32 matches to 'sha' id of pull requests
    mapping (byte32 => pullRequestStruct) pullRequests;

    modifier checkClaimAllowable () {
        require(bountyStatus == requestState.Unlocked && unlockBlockNumber > lockBlockNumber);
        _;
    }

    modifier onlyBountyManagers () {
        require(bountyManagers[msg.sender] == true);
        _;
    }

    function addManager (address _newManager) onlyBountyCreator returns (bool success) {
        bountyManagers[_newManager] = true;
        return true;
    }

    function delManager (address _oldManager) onlyBountyCreator returns (bool success) {
        bountyManagers[_oldManager] = false;
        return true;
    }

    function shareOf (uint256 _tokenAmount) constant returns (uint256) {
        require (token.balanceOf(msg.sender) >= _tokenAmount);
        return div(_tokenAmount, token.totalBalance());
    }

    function claimBounty (uint256 _tokenAmount) checkClaimAllowable {
        uint256 sendBalance = mul(this.balance, shareOf(msg.sender));
        require (msg.sender.send(sendBalance));
        token.approve(msg.sender, bountyCreator, token.balanceOf(_bountyHunter));
        token.transferFrom(msg.sender, bountyCreator, token.balanceOf(_bountyHunter));
        return true;
    }

    function unlockBounty () public onlyBountyCreator {
        if (bountyStatus == requestState.Inactive) throw;
        bountyStatus = requestState.Unlocked;
        unlockBlockNumber = block.number;
    }

    function lockBounty () public onlyBountyManagers {
        bountyStatus = requestState.Locked;
        lockBlockNumber = block.number;
    }

    function multiTransfer (address[] _bountyHunters, uint256[] _bountyValues) onlyBountyCreator {
        if (_bountyHunters.length != _bountyValues.length) throw;
        for(uint256 i=0; i<_bountyHunters.length; i++) {
            if (!StandardToken(tokenContractAddress).transfer(_bountyHunters[i], _bountyValues[i])) throw;
        }
    }
}

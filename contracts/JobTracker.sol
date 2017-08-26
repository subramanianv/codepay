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

    event ChangeOwner (address _oldOwner, address _newOwner);
    event ManagerAdded (address _newManager);
    event ManagerDeleted (address _oldManager);
    event SubmitWork (address _bountyHunter, uint256 _tokenAmount, byte32 _pullRequestID);
    event AcceptWork (address _projectManager, address _bountyHunter, uint256 _amount);
    event BountyFunded (address _funder, uint256 _amount);
    event BountyLocked (address _locker, uint256 _lockBlockTime);
    event BountyUnlocked (address _unlocker, uint256 _unlockBlockTime);
    event BountyCLaimed (address _bountyHunter, uint256 _tokenAmount, uint _etherAmount);

    address public tokenContractAddress;
    address public bountyCreator;
    mapping (address => bool) bountyManagers;

    uint256 public lockBlockNumber;
    uint256 public lockPayAmount;
    uint256 unlockBlockNumber;

    StandardToken token;

    enum requestState {
        Inactive,
        Locked,
        Unlocked
    }

    requestState public bountyStatus;

    struct pullRequestStruct {
        address bountyHunter;
        uint256 tokenBountyAmount;
    }

    mapping (byte32 => pullRequestStruct) public pullRequests;

    //==========================================
    // MODIFIERS
    //==========================================

    modifier onlyBountyCreator {
        require (msg.sender == bountyCreator);
        _;
    }

    modifier onlyBountyManagers () {
        require (bountyManagers[msg.sender] == true);
        _;
    }

    modifier checkClaimAllowable () {
        require (bountyStatus == requestState.Unlocked && unlockBlockNumber > lockBlockNumber);
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

    function bountyValue () public constant returns (uint currentBounty) {
        return this.balance;
    }

    function shareOf (uint256 _tokenAmount) constant returns (uint256 _shareOf) {
        require (token.balanceOf(msg.sender) >= _tokenAmount);
        return div(_tokenAmount, token.totalBalance());
    }

    function isBountyManager () constant returns (bool isTrue) {
        return bountyManagers[msg.sender];
    }

    function isBountyCreator () constant returns (bool isTrue) {
        if (bountyCreator != msg.sender) return false;
    }

    //==========================================
    // SETTERS
    //==========================================

    function submitBounty (uint256 _tokenAmount, byte32 _pullRequestID) returns (bool success) {
        pullRequests[_pullRequestID] = pullRequestStruct ({
            bountyHunter: msg.sender,
            tokenBountyAmount: _tokenAmount
        });
        SubmitWork (msg.sender, _tokenAmount, _pullRequestID);
        return true;
    }

    function acceptWork (address _bountyHunter, uint256 _tokenAmount, byte32 _pullRequestID)
        onlyBountyManagers
        returns (bool success)
    {
        if (pullRequests[_pullRequestID].bountyHunter != _bountyHunter || pullRequests[_pullRequestID].tokenBountyAmount != _tokenAmount]) throw;

        if (bountyStatus == requestState.Inactive) {
            bountyStatus = requestState.Locked;
        }
        require (token.transfer(_bountyHunter, _amount));
        AcceptWork(msg.sender, _bountyHunter, _amount);
        return true;
    }

    function lockBounty () public onlyBountyManagers returns (bool success) {
        bountyStatus = requestState.Locked;
        lockBlockNumber = block.number;
        BountyLocked (msg.sender, lockBlockNumber);
        return true;
    }

    function unlockBounty () public onlyBountyManagers returns (bool success) {
        if (bountyStatus == requestState.Inactive) throw;
        bountyStatus = requestState.Unlocked;
        unlockBlockNumber = block.number;
        BountyUnlocked (msg.sender, unlockBlockNumber)
        return true;
    }

    function claimBounty (uint256 _tokenAmount) checkClaimAllowable returns (bool success) {
        uint256 sendBalance = mul(this.balance, shareOf(msg.sender));
        require (msg.sender.send(sendBalance));
        token.approve(msg.sender, bountyCreator, _tokenAmount);
        token.transferFrom(msg.sender, bountyCreator, _tokenAmount);
        BountyCLaimed(msg.sender, _tokenAmount, sendBalance)
        return true;
    }

    function changeBountyCreator (address _newBountyCreator) onlyBountyCreator returns (bool success) {
        bountyCreator = _newBountyCreator;
        ChangeOwner(BountyCreator, _newBountyCreator);
        return true;
    }

    function addManager (address _newManager) onlyBountyCreator returns (bool success) {
        bountyManagers[_newManager] = true;
        ManagerAdded (_newManager);
        return true;
    }

    function delManager (address _oldManager) onlyBountyCreator returns (bool success) {
        delete bountyManagers[_oldManager];
        ManagerDeleted (_oldManager);
        return true;
    }

    //==========================================
    // MISCELLANEOUS
    //==========================================

    function () payable {
        if (bountyStatus == requestState.Inactive) throw;
        BountyFunded(msg.sender, msg.value);
    }

    //==========================================
    // Work-In-Progress
    //==========================================
}

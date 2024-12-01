// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Save(uint256 amount);
    event OpenPiggyBank(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function save(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Save(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance);

    function openPiggyBank() public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint totalSavings = balance;

        if (totalSavings == 0) {
            revert InsufficientBalance({balance: balance});
        }

        // get all the savings inside piggybank
        balance -= totalSavings;

        // assert the balance is correct
        assert(balance == 0);

        // emit the event
        emit OpenPiggyBank(totalSavings);
    }
}

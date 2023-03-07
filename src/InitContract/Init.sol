// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TestContract {

    uint256 public Variable = 2;
    
    function increase() public{
        Variable = Variable + 1;
    }

        function decrease() public{
        Variable = Variable - 1;
    }
}
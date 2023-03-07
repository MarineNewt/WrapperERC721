// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TestContract {

    address target;
    item private lastitem;

    constructor (address _target, uint256 _times){
        for(uint256 i; i < _times;){
        unchecked{
        lastitem = new item(tx.origin, _target);
        ++i;
        }}
    }

}

contract item {
    constructor(address _owner, address _target){

    }
}

interface nftcontract{
    function mint() external;
    function transfer() external;
}

// File: contracts/Wrapper.sol
pragma solidity ^0.8.9;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract Minter is ERC1155, Ownable, ERC1155Burnable {
    NFTContract1155 public WrappedContract;
    constructor(NFTContract1155 ContractSet) ERC1155("URI") {
        WrappedContract = ContractSet;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
        if(msg.sender == address(WrappedContract)) {
            _mint(tx.origin, 1, 1, "0x00");
        }
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

}

interface NFTContract1155 {
   function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}
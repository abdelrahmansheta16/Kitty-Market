// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";

import "./KittyContract.sol";

contract Utils is KittyContract {

    constructor() KittyContract(){}
    using Counters for Counters.Counter;

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function updateGenerationLimit(uint256 _limit) public payable {
        require(owner == msg.sender, "Only owner can update generation limit");
        generationLimit = _limit;
    }

    function getGenerationLimit() public view returns (uint256) {
        return generationLimit;
    }

    function getLatestIdToListedToken()
        public
        view
        returns (ListedToken memory)
    {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(
        uint256 tokenId
    ) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }
}

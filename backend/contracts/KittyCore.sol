// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Utils.sol";
import "hardhat/console.sol";

//KittyContract deployed to: 0x8AC2b16D418A6F11b7Ac54801638212Cc2939248

contract KittyCore is Utils {
    constructor(uint price, string[] memory initialTokenURIs) Utils() {
        createKittinsGen0(price, initialTokenURIs);
    }

    struct Kitty {
        uint256 genes;
        uint birthTime;
        uint mumId;
        uint dadId;
        uint generation;
    }

    function Breeding(
        uint256 _dadId,
        uint256 _mumId,
        uint256 dadGenes,
        uint256 momGenes,
        uint256 dadGeneration,
        uint256 momGeneration
    ) public view returns (Kitty memory) {
        require(
            idToListedToken[_dadId].seller == payable(msg.sender),
            "The user doesn't own the token"
        );
        require(
            idToListedToken[_mumId].seller == payable(msg.sender),
            "The user doesn't own the token"
        );
        require(_mumId != _dadId, "The cat can't reproduce itself");

        uint256[8] memory geneArray;
        uint256 index = 7;
        uint256 i;
        for (i = 1; i <= 128; i = i * 2) {
            if (getRandomNumber(i) % 2 == 0) {
                geneArray[index] = uint8(momGenes % 100);
            } else {
                geneArray[index] = uint8(dadGenes % 100);
            }
            momGenes /= 100;
            dadGenes /= 100;
            if (i != 128) {
                index--;
            }
        }
        uint8 newGeneIndex = uint8(getRandomNumber(index) % 7);
        geneArray[newGeneIndex] = getRandomNumber(index + 5) % 99;

        uint256 geneKid;
        for (i = 0; i < 8; i++) {
            geneKid += geneArray[i];
            if (i != 7) {
                geneKid *= 100;
            }
        }
        console.log("geneKid: %d", geneKid);

        uint256 kidGen = (dadGeneration < momGeneration)
            ? momGeneration + 1
            : (dadGeneration > momGeneration)
            ? dadGeneration + 1
            : momGeneration + 1;
        if (kidGen > generationLimit) {
            kidGen = generationLimit;
        }
        console.log("kidGen: %d", kidGen);
        return
            Kitty({
                genes: geneKid,
                birthTime: block.timestamp,
                mumId: _mumId,
                dadId: _dadId,
                generation: kidGen
            });
    }

    function createKittinsGen0(uint price, string[] memory tokenUris) private {
        uint newPrice = price * 1 ether;
        for (uint256 i = 0; i < tokenUris.length; i++) {
            createToken(tokenUris[i], newPrice, 0);
            getListedTokenForId(1);
        }
    }
}

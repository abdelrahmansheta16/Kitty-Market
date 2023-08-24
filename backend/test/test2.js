const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {

  it("should be a winner", async function () {
    const Greeter = await ethers.getContractFactory("KittyContract");
    const greeter = await Greeter.deploy();
    const amountToSend = ethers.parseEther("0.0001");
    await greeter.waitForDeployment()
    await greeter.createToken("https://gateway.pinata.cloud/ipfs/QmQ7KqWuJo4g9haoocLZpwqu2kRegVv1f6GHXgKTG2hy6C", parseInt(amountToSend), 10)
    await greeter.executeSale(1, { value: amountToSend });


    // assert(await game.isWon(), "You did not win the game");
  });
});

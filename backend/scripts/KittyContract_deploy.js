const hre = require("hardhat");

async function main() {
	const ipfsUrls = [
		"https://gateway.pinata.cloud/ipfs/QmZcqUapB83Z16824PktqZh1RQK3i7jHQEtvNfKw1DLjcD",
		"https://gateway.pinata.cloud/ipfs/QmP8pFYMmfqtnNGe9fWKPQWa4NNsBmGddUcwKGSfZoELuA",
		"https://gateway.pinata.cloud/ipfs/QmaKoeo7U4TMmbJP8TeeEsgoB6kRRbgeEFTUrnxQw27AYd",
		"https://gateway.pinata.cloud/ipfs/QmQPjLxPmVQ9a1PXmMdjmUMjbzv6GWokDuy65YfitKTuuu",
		"https://gateway.pinata.cloud/ipfs/QmcCbmWzUb4dJKK3SyBZDzEv5QPwDHFRbecrvzTqaJ2zAN",
		"https://gateway.pinata.cloud/ipfs/QmXwgE7Cekg5jFQxF43Ft1oFNXzbGmTz1WTN1xijR5qyXE",
		"https://gateway.pinata.cloud/ipfs/QmPJCGJcDiXJ6UAxp3tWwFHzzJub9Ru2fcswHYDHwFxcFb",
		"https://gateway.pinata.cloud/ipfs/QmXS8RDWg4XeMefwMShBS2aiHDwbRPP4YG8aJfmLS2piiF",
		"https://gateway.pinata.cloud/ipfs/QmPJSfdRPdaZif4H7Z6s9KU7wmV1u8WMoc4bSMA2ekhhUX",
		"https://gateway.pinata.cloud/ipfs/QmZy4cufXtNRfp6ZYVL51PVaj9FJC7cwMLnWj1AuZTH3NJ"
	];

	console.log(ipfsUrls);

	const Contract = await hre.ethers.getContractFactory("KittyCore");
	console.log(Contract)
	const contract = await Contract.deploy(50, ipfsUrls);
	await contract.waitForDeployment();
	const contractAddress = await contract.getAddress();
	console.log("KittyContract deployed to:", contractAddress);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
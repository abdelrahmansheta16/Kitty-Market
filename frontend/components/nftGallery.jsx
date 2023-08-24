import { useEffect, useState } from "react";
import styles from "../styles/NftGallery.module.css";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Marketplace from "../pages/artifacts/contracts/KittyCore.sol/KittyCore.json"
import Link from "next/link";
import axios from "axios"
import { ethers } from "ethers";
import NFTTile from "./NFTTile"
import { GetIpfsUrlFromPinata } from "./utils/pinata";
import NFTCard from "./NFTTile";
import { contractAddress } from "./utils/constants";

export default function NFTGallery() {
  const [nfts, setNfts] = useState([]);
  const [fetchMethod, setFetchMethod] = useState("wallet");
  const [dataFetched, updateFetched] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected } = useAccount();
  const router = useRouter()
  console.log(router)
  // const changeFetchMethod = (e) => {
  //   setNfts()
  //   setPageKey()
  //   switch (e.target.value) {
  //     case "wallet":
  //       setWalletOrCollectionAddress("vitalik.eth");

  //       break;
  //     case "collection":
  //       setWalletOrCollectionAddress(
  //         "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e"
  //       );
  //       break;
  //     case "connectedWallet":
  //       setWalletOrCollectionAddress(address);
  //       break;
  //   }
  //   setFetchMethod(e.target.value);
  // };
  const fetchNFTs = async (pagekey) => {
    setIsloading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, Marketplace.abi, signer)
      console.log(contract)
      const Nfts = await contract.getAllNFTs()
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(Nfts.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          dna: meta.dna,
          name: meta.name,
        }
        return item;
      }))
      console.log(items)
      updateFetched(true)
      if (items?.length) {
        setNfts(items);
      }
    } catch (e) {
      console.log(e);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, [fetchMethod]);
  return (
    <div className="nft-grid">
      {nfts.map((nftData, index) => (
        <NFTCard key={index} nftData={nftData} />
      ))}
    </div>
  );
}

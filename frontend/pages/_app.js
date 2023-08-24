import "../styles/globals.css";
import "../styles/NFTFactory.css"
import "../styles/animations.css"
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

import "@rainbow-me/rainbowkit/styles.css";
import MainLayout from "../layout/mainLayout";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
console.log(__dirname)
require('dotenv').config()

const { chains, publicClient } = configureChains(
	[mainnet, sepolia],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
		publicProvider()
	]
);

const { connectors } = getDefaultWallets({
	appName: 'Dapp',
	projectId: process.env.NEXT_PUBLIC_CONNECT_WALLET_ID,
	chains
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
})

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<MainLayout>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Head>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;

import "../styles/globals.css";
import { configureChains, Connector, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import config from "@/config";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Navbar } from "@/Nav/navbar";
import { Roboto } from "next/font/google";
import { StrictMode } from "react";
import Footer from "@/components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
  ],
  [alchemyProvider({ apiKey: config.Alchemy_Api_Key }), publicProvider()]
);

export const connectors: Connector[] = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
];

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <chakra.div className={roboto.className}>
      <ChakraProvider resetCSS>
        <WagmiConfig client={wagmiClient}>
          <chakra.div w="full" minH="100vh" bg="#17171a" color="white">
            <Navbar />
            <Component {...pageProps} />
          </chakra.div>
          <Footer />
        </WagmiConfig>
      </ChakraProvider>
    </chakra.div>
  );
};

export default MyApp;

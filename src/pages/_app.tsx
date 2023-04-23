import "../styles/globals.css";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Navbar } from "@/Nav/navbar";
import { Roboto } from "next/font/google";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const desiredChainId = ChainId.Polygon;
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <chakra.div className={roboto.className}>
      <ChakraProvider resetCSS>
        {/* @ts-ignore */}
        <ThirdwebProvider desiredChainId={desiredChainId}>
          <QueryClientProvider client={queryClient}>
            <chakra.div w="full" minH="100vh" bg="#17171a" color="white">
              <Navbar />
              <Component {...pageProps} />
            </chakra.div>
          </QueryClientProvider>
        </ThirdwebProvider>
        <Footer />
      </ChakraProvider>
    </chakra.div>
  );
};

export default MyApp;

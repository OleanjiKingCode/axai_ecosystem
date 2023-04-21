const config = {
	Alchemy_Api_Key: process.env.ALCHEMY_API_KEY || "",
	Private_Key: process.env.PRIVATE_KEY || "",
	InfuraApiKey: process.env.INFURA_API_KEY || "",
	Infura_secret_key: process.env.INFURA_API_KEY_SECRET || "",
	JWT: process.env.JWT,
};
export default config;

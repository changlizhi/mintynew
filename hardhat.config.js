require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	diy: {
		CONTRACT_NAME: "STARIVERPudgyPenguins10",
		ROPSTEN_ADDR1: "0x75384f3f64e91ddde1f254db6fdd2adddfeb39eb",
		RINKEBY_ADDR1: "0xaf6d667582953Eee0b059F656e8b125Aae636F53",
		LOCAL_ADDR1: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
	},
	defaultNetwork: 'rinkeby',
	networks: {
		hardhat: {},
		localhost: {},
		ropsten: {
			// url: `https://eth-rinkeby.alchemyapi.io/v2/XP7qfYO3zuvgiw8IBPabmnYY8E8_dvKC`,
			url: "https://ropsten.infura.io/v3/62867aec9d3a43059a065cbccd6257d5",

			accounts: [
				"0x3a5d74b168e58ba169176a09e6bb5217cd875cd6996153500a7bd4bdae597d8f",
			]
		},
		rinkeby: {
			// url: `https://eth-rinkeby.alchemyapi.io/v2/XP7qfYO3zuvgiw8IBPabmnYY8E8_dvKC`,
			url: "https://rinkeby.infura.io/v3/62867aec9d3a43059a065cbccd6257d5",
			accounts: [
				"0x3e65b7815de0df5508542a310eb7c3a3af207e2d953508f8ca7f4bf55364a42a",
			]
		}

	}
};

async function main() {

	const [deployer] = await ethers.getSigners();
	const hardhat = require('hardhat')

	const CONTRACT_NAME = hardhat.config.diy.CONTRACT_NAME
	console.log("使用" + deployer.address + "部署" + CONTRACT_NAME + "，余额为：" + (await deployer.getBalance()).toString())

	const {
		MakeMinty
	} = require('./minty')
	const minty = await MakeMinty()

	const currentTokenId = await minty.getCurrentTokenId()
	console.log("currentTokenId:", currentTokenId)

}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});

async function main() {

	const hardhat = require('hardhat')
	const CONTRACT_NAME = hardhat.config.diy.CONTRACT_NAME
	const [deployer] = await ethers.getSigners()
	console.log("请先复制sol文件更改名称和类名以及hardhat配置并编译之后再部署，否则不会保存json文件")
	console.log("使用" + deployer.address + "部署" + CONTRACT_NAME + "，余额为：" + (await deployer.getBalance()).toString())

	const Minty = await hardhat.ethers.getContractFactory(CONTRACT_NAME)
	const minty = await Minty.deploy(CONTRACT_NAME, CONTRACT_NAME)

	const {
		saveDeploymentInfo
	} = require('./deploy')

	const saveInfo = await saveDeploymentInfo(hardhat, minty)

	console.log("address---:", minty.address, saveInfo)
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error("error---", error)
		process.exit(1)
	})

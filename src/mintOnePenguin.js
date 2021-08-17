async function main() {

    const [deployer] = await ethers.getSigners()
	const hardhat = require('hardhat')
	const CONTRACT_NAME = hardhat.config.diy.CONTRACT_NAME

	console.log("使用" + deployer.address + "铸造:" + CONTRACT_NAME + "，余额为：" + (await deployer.getBalance()).toString())

    const {MakeMinty} = require('./minty')
    const minty = await MakeMinty()

    const hardhatConfig =minty.hardhat.config
    const diyConfig = hardhatConfig.diy

    let addr1 = ""
    if(hardhatConfig.defaultNetwork === "localhost"){
        addr1 = diyConfig.LOCAL_ADDR1
    }else if (hardhatConfig.defaultNetwork === "ropsten"){
        addr1 = diyConfig.ROPSTEN_ADDR1
    }else if (hardhatConfig.defaultNetwork === "hardhat"){
        addr1 = diyConfig.LOCAL_ADDR1
    }else if (hardhatConfig.defaultNetwork === "rinkeby"){
        addr1 = diyConfig.RINKEBY_ADDR1
    }
    const RINKEBY_ADDR1="0xaf6d667582953Eee0b059F656e8b125Aae636F53"
    let ret = await minty.mintPenguin(RINKEBY_ADDR1,1)
    console.log("minty address:", minty.contract.address,ret)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

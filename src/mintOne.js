async function main() {

    const [deployer] = await ethers.getSigners()

    console.log(
        "Minting NFT with address:",
        deployer.address,
        "and balance is :",
        (await deployer.getBalance()).toString())

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
    await minty.mintToken(RINKEBY_ADDR1,"http://192.168.120.16:8081/public/p2c2.png.json")
    console.log("minty address:", minty.contract.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

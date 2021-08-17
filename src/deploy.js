const fs = require('fs/promises')

function deploymentInfo(hardhat, minty) {
    return {
        network: hardhat.network.name,
        contract: {
            name: hardhat.config.diy.CONTRACT_NAME,
            address: minty.address,
            signerAddress: minty.signer.address,
            abi: minty.interface.format(),
        },
    }
}

async function saveDeploymentInfo(hardhat, minty) {
    const info = deploymentInfo(hardhat, minty)
    console.log(`info---${info}`)
    const filename = hardhat.config.diy.CONTRACT_NAME +"_"+ hardhat.config.defaultNetwork+"_" + "Config.json"

    console.log(`Writing deployment info to ${filename}`)
    const content = JSON.stringify(info, null, 2)
    await fs.writeFile(filename, content, {encoding: 'utf-8'})
    console.log("info---:", info, "\nsaved filename---:", filename)
    return true
}

async function loadDeploymentInfo(hardhat) {
    const path = hardhat.config.diy.CONTRACT_NAME+"_" + hardhat.config.defaultNetwork+"_" + "Config.json"
    console.log(`atpath---: ${path}`)

    const content = await fs.readFile(path, {encoding: 'utf8'})
    console.log(content, ":---loaded content")
    deployInfo = JSON.parse(content)
    try {
        validateDeploymentInfo(deployInfo)
    } catch (e) {
        throw new Error(`error reading deploy info from ${path}: ${e.message}`)
    }
    return deployInfo
}

function validateDeploymentInfo(deployInfo) {
    const {contract} = deployInfo
    if (!contract) {
        throw new Error('required field "contract" not found')
    }
    const required = arg => {
        if (!deployInfo.contract.hasOwnProperty(arg)) {
            throw new Error(`required field "contract.${arg}" not found`)
        }
    }

    required('name')
    required('address')
    required('abi')
}

module.exports = {
    loadDeploymentInfo,
    saveDeploymentInfo,
}

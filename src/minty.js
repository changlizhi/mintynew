const {
	BigNumber
} = require('ethers')
const {
	loadDeploymentInfo
} = require('./deploy')
// const config = require('getconfig')//default find `config` dir
// console.log("config---",config)

async function MakeMinty() {
	const m = new Minty()
	await m.init()
	return m
}

class Minty {
	constructor() {
		this.ipfs = null
		this.contract = null
		this.deployInfo = null
		this._initialized = false
	}

	async init() {
		if (this._initialized) {
			return
		}
		this.hardhat = require('hardhat')

		this.deployInfo = await loadDeploymentInfo(this.hardhat)

		const {
			abi,
			address
		} = this.deployInfo.contract
		this.contract = await this.hardhat.ethers.getContractAt(abi, address)

		this._initialized = true
	}

	async mintToken(ownerAddress, metadataURI) {
		console.log("this.contract.address---:", this.contract.address, ownerAddress, metadataURI)
		const tx = await this.contract.mintToken(ownerAddress, metadataURI)
		const receipt = await tx.wait()
		for (const event of receipt.events) {
			if (event.event !== 'Transfer') {
				console.log('ignoring unknown event type ', event.event)
				continue
			}
			return event.args.tokenId.toString()
		}

		throw new Error('unable to get token id')
	}
	async mintPenguin(ownerAddress, count) {
		const tx = await this.contract.mint(ownerAddress, count)
		const receipt = await tx.wait()
		for (const event of receipt.events) {
			if (event.event !== 'Transfer') {
				console.log('ignoring unknown event type ', event.event)
				continue
			}
			return event.args.tokenId.toString()
		}

		throw new Error('unable to get token id')
	}

	async mintTokenSTARNFT13(ownerAddress, metadataURI,imageURI) {
		console.log("this.contract.address---:", this.contract.address, ownerAddress, metadataURI)
		const tx = await this.contract.mintToken(ownerAddress, metadataURI,imageURI)
		const receipt = await tx.wait()
		for (const event of receipt.events) {
			if (event.event !== 'Transfer') {
				console.log('ignoring unknown event type ', event.event)
				continue
			}
			return event.args.tokenId.toString()
		}

		throw new Error('unable to get token id')
	}
	async transferToken(tokenId, toAddress) {
		const fromAddress = await this.getTokenOwner(tokenId)
		const tranferFn = this.contract['safeTransferFrom(address,address,uint256)']
		const tx = await tranferFn(fromAddress, toAddress, tokenId)
		await tx.wait()
	}

	async defaultOwnerAddress() {
		const signers = await this.hardhat.ethers.getSigners()
		return signers[0].address
	}
	async getTokenUri(tokenId) {
		const uri = await this.contract.tokenURI(tokenId)
		return uri
	}
	async getCurrentTokenId() {
		const uri = await this.contract.getCurrentTokenId()
		return uri
	}
	async getTokenOwner(tokenId) {
		return this.contract.ownerOf(tokenId)
	}

	async getCreationInfo(tokenId) {
		const filter = await this.contract.filters.Transfer(
			null,
			null,
			BigNumber.from(tokenId)
		)

		const logs = await this.contract.queryFilter(filter)
		const blockNumber = logs[0].blockNumber
		const creatorAddress = logs[0].args.to
		return {
			blockNumber,
			creatorAddress,
		}
	}
}
module.exports = {
	MakeMinty,
}

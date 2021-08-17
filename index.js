
const express = require('express')
const app = express()
const port = 3000

app.get('/',async (req, res) => {

  const {MakeMinty} = require('../minty')
  const minty = await MakeMinty()
  // console.log("minty.hardhat.ethers.Wallet---:",minty.hardhat.ethers.Wallet)

  // const token1Belong = await minty.getTokenOwner("1")
  // const token2Belong = await minty.getTokenOwner("2")
  // console.log("minty address:", minty.contract.address);
  // console.log("token1Belong---:", token1Belong, "token2Belong---:", token2Belong)


  // let Web3 = require('web3')
  // let myweb3 = new Web3(new Web3.providers.HttpProvider("https://eth-rinkeby.alchemyapi.io/v2/XP7qfYO3zuvgiw8IBPabmnYY8E8_dvKC"));
  // myweb3.eth.defaultChain="rinkeby"
  // myweb3.eth.defaultAccount="0x75384f3f64e91ddde1f254db6fdd2adddfeb39eb"
  // console.log("myweb3---",myweb3.eth.defaultAccount)
  // await myweb3.eth.getTransaction("0xff698afbd0b324c302883e3dea5e91afc0bc5d86f54d3e5dd5d9d09fcf0c7a4f", function (error, result) {
  //   console.log(error)
  //   console.log(myweb3.eth.abi.decodeParameter("string",result.input.toString()))
  // })
  const tokenuri = await minty.getTokenUri("2")
  res.send('tokenuri---:'+tokenuri)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

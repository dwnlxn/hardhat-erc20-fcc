const { network, getNamedAccounts, ethers } = require("hardhat")
const { TASK_ETHERSCAN_VERIFY } = require("hardhat-deploy")
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts()
  const { deploy, log } = deployments
  const args = [INITIAL_SUPPLY]

  const ourToken = await deploy("OurToken", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  })

  if (
    process.env.ETHERSCAN_API_KEY &&
    !developmentChains.includes(network.name)
  ) {
    await verify(ourToken.address, args)
  }

  log("-------------------------------------------------------------")
}

module.exports.tags = ["all"]

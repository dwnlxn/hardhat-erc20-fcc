const { network, deployments, ethers, log } = require("hardhat")
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("OurToken Unit Test", function () {
      let deployer, ourToken

      beforeEach(async function () {
        const accounts = await ethers.getSigners()
        deployer = accounts.deployer
        await deployments.fixture(["all"])
        ourToken = await ethers.getContract("OurToken", deployer)
        // console.log(ourToken.address)
      })

      describe("constructor", async function () {
        it("verify the token name", async function () {
          //const totalSupply = await ourToken.totalSupply
          const name = await ourToken.name()
          assert.equal(name, "OurToken")
        })

        it("verify the initial supply", async function () {
          const currentSupply = await ourToken.totalSupply()
          assert.equal(currentSupply.toString(), INITIAL_SUPPLY)
        })
      })
    })

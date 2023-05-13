import { ethers, run } from "hardhat";
const hre = require("hardhat");
// npx hardhat run script/deploy-deterministic-deploy-factory.ts --network binance
export const deployDeterministicDeployFactoryContract = async () => {
  try {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    console.log(`DeterministicDeployFactory is being deployed by: ${deployer}`);
    const DeterministicDeployFactory = await ethers.getContractFactory('DeterministicDeployFactory');
    const deterministicDeployFactory = await DeterministicDeployFactory.deploy();
    console.log("DeterministicDeployFactory deploy initiated");
    await deterministicDeployFactory.deployed();
    console.log("DeterministicDeployFactory deployed at ", deterministicDeployFactory.address);

    await sleep(5);
    // 0xE006DBFCEBb37BB575908d262A0057D19A2C378F - bsc
    await run("verify:verify", {
      address: deterministicDeployFactory.address,
      contract: `src/DeterministicDeployFactory.sol:DeterministicDeployFactory`,
      constructorArguments: [],
    });


  } catch (error) {
    console.log("Error in deploying DeterministicDeployFactory", error);
    return {
      success: false,
    };
  }
};

export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay * 1000));

deployDeterministicDeployFactoryContract()
  .then(() => {
    console.log("✅ finished deploying DeterministicDeployFactory Contract.");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

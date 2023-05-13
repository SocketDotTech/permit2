import { ethers, run } from "hardhat";
const hre = require("hardhat");

// npx hardhat run script/deploy-permit2.ts --network aurora
export const deployPermit2Contract = async () => {
  try {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    console.log(`permit2 is being deployed by: ${deployer}`);
    const Permit2 = await ethers.getContractFactory('Permit2');
    const permit2Contract = await Permit2.deploy();
    console.log("permit2 deploy initiated");
    await permit2Contract.deployed();
    console.log("permit2 deployed at ", permit2Contract.address);

    await sleep(5);

    // await run("verify:verify", {
    //   address: permit2Contract.address,
    //   contract: `src/Permit2.sol:Permit2`,
    //   constructorArguments: [],
    // });


  } catch (error) {
    console.log("Error in deploying Permit2", error);
    return {
      success: false,
    };
  }
};

export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay * 1000));

deployPermit2Contract()
  .then(() => {
    console.log("✅ finished deploying Permit2.");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

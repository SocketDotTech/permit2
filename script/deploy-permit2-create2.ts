import { bytecode } from "../artifacts/src/Permit2.sol/Permit2.json";
import { encoder, create2Address } from "./deploy-utils";
import { ethers, run } from "hardhat";

// npx hardhat run script/deploy-permit2-create2.ts --network binance
const main = async () => {
  const factoryAddr = "0xE006DBFCEBb37BB575908d262A0057D19A2C378F";
  const saltHex = ethers.utils.id("socket-permit2");
  const initCode = bytecode;

  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log("precomputed address:", create2Addr);

  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factory = await Factory.attach(factoryAddr);

  const permit2Deploy = await factory.deploy(initCode, saltHex);
  const txReceipt = await permit2Deploy.wait();
  console.log("Deployed to:", txReceipt.events[0].args[0]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
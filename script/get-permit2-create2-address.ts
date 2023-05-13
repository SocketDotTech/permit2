import { bytecode } from "../artifacts/src/Permit2.sol/Permit2.json";
import { encoder, create2Address } from "./deploy-utils";
import { ethers, run } from "hardhat";

// npx hardhat run script/get-permit2-create2-address.ts --network polygon
const main = async () => {
  const factoryAddr = "0xE006DBFCEBb37BB575908d262A0057D19A2C378F";
  const saltHex = ethers.utils.id(1234);
  const initCode = bytecode;

  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log("precomputed address:", create2Addr);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import "hardhat-deploy";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import fs from "fs";
import { HardhatUserConfig } from "hardhat/config";

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}

const getEtherscanKey = () => {
  let network;
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--network') {
      network = process.argv[i + 1];
      break
    }
  }

  if (!network) {
    return ''
  }

  switch (network) {
    case 'mainnet':
      return process.env.MAINNET_ETHERSCAN_KEY
    case 'polygon':
      return process.env.POLYGON_ETHERSCAN_KEY
    case 'opt':
      return process.env.OPTIMISM_ETHERSCAN_KEY
    case 'arbitrum':
      return process.env.ARBITRUM_ETHERSCAN_KEY
    case 'avax':
      return process.env.AVALANCHE_ETHERSCAN_KEY
    case 'binance':
      return process.env.BINANCE_ETHERSCAN_KEY
    case 'fantom':
      return process.env.FANTOM_ETHERSCAN_KEY
    case 'aurora':
      return process.env.AURORA_ETHERSCAN_KEY
    case 'xdai': return process.env.GNOSIS_ETHERSCAN_KEY
    default:
      return ''
  }
}

const permit2DeployerKey = process.env.PERMIT2_DEPLOYER_KEY;
if (!permit2DeployerKey) {
  throw new Error("Please set your PERMIT2_DEPLOYER_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mainnet: {
      url: process.env.ETHEREUM_RPC,
      gasPrice: 20_000_000_000, // 20 gwei
      gasMultiplier: 1.5,
      chainId: 1,
      accounts: [permit2DeployerKey],
    },
    xdai: {
      url: "https://rpc.gnosischain.com/",
      gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 100,
      accounts: [permit2DeployerKey],

    },
    polygon: {
      url: `https://matic-mainnet.chainstacklabs.com`,
      gasPrice: 40_000_000_000, // 40 gwei
      gasMultiplier: 1.5,
      chainId: 137,
      accounts: [permit2DeployerKey],

    },
    binance: {
      url: `https://bsc-dataseed.binance.org/`,
      gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 56,
      accounts: [permit2DeployerKey],

    },
    fantom: {
      url: `https://rpc.ftm.tools/`,
      // gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 250,
      accounts: [permit2DeployerKey],

    },
    avax: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      // gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 43114,
      accounts: [permit2DeployerKey],

    },
    opt: {
      url: `https://mainnet.optimism.io`,
      // gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 10,
      accounts: [permit2DeployerKey],

    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      // gasPrice: 5_000_000_000, // 5 gwei
      gasMultiplier: 1.5,
      chainId: 42161,
      accounts: [permit2DeployerKey],

    },
    aurora: {
      url: "https://mainnet.aurora.dev",
      chainId: 1313161554,
      accounts: [permit2DeployerKey],
    },
  },
  etherscan: {
    // apiKey: getEtherscanKey(),
    apiKey: {
      polygon: process.env.POLYGON_ETHERSCAN_KEY,
      xdai: process.env.GNOSIS_ETHERSCAN_KEY,
      optimisticEthereum: process.env.OPTIMISM_ETHERSCAN_KEY,
      arbitrumOne: process.env.ARBITRUM_ETHERSCAN_KEY,
      aurora: process.env.AURORA_ETHERSCAN_KEY,
      binance: process.env.BINANCE_ETHERSCAN_KEY,
      opera: process.env.FANTOM_ETHERSCAN_KEY,
      avax: process.env.AVALANCHE_ETHERSCAN_KEY,
      ethereum: process.env.MAINNET_ETHERSCAN_KEY,
    }
  },
  paths: {
    sources: "./src", // Use ./src rather than ./contracts as Hardhat expects
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
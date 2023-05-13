/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { SafeCast160, SafeCast160Interface } from "../SafeCast160";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "UnsafeCast",
    type: "error",
  },
];

const _bytecode =
  "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea2646970667358221220abcfbc78b47b5d9bce6349e7fa01228ebe040b4760d87c4f2d79827c39bcfb7b64736f6c63430008110033";

export class SafeCast160__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SafeCast160> {
    return super.deploy(overrides || {}) as Promise<SafeCast160>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SafeCast160 {
    return super.attach(address) as SafeCast160;
  }
  connect(signer: Signer): SafeCast160__factory {
    return super.connect(signer) as SafeCast160__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeCast160Interface {
    return new utils.Interface(_abi) as SafeCast160Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SafeCast160 {
    return new Contract(address, _abi, signerOrProvider) as SafeCast160;
  }
}

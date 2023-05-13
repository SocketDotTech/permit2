/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  SignatureVerification,
  SignatureVerificationInterface,
} from "../SignatureVerification";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "InvalidContractSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSigner",
    type: "error",
  },
];

const _bytecode =
  "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea264697066735822122081a93f7dc59205b09d7a070959720c196aefac07cff8dd4aaccb9fbeccd4a64564736f6c63430008110033";

export class SignatureVerification__factory extends ContractFactory {
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
  ): Promise<SignatureVerification> {
    return super.deploy(overrides || {}) as Promise<SignatureVerification>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SignatureVerification {
    return super.attach(address) as SignatureVerification;
  }
  connect(signer: Signer): SignatureVerification__factory {
    return super.connect(signer) as SignatureVerification__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignatureVerificationInterface {
    return new utils.Interface(_abi) as SignatureVerificationInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignatureVerification {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SignatureVerification;
  }
}

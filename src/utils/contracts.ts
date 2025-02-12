import {
  ClaimableConetPointAbi,
  ConetGuardianNodesV6,
  FaucetV3Abi,
  GuardianNodesInfoV6Abi,
  ConetStorageAbi,
} from "./abis";

export const contracts = {
  GuardianNodesInfoV6: {
    address: "0x88cBCc093344F2e1A6c2790A537574949D711E9d",
    abi: GuardianNodesInfoV6Abi,
  },
  ConetGuardianNodesV6: {
    address: "0x312c96DbcCF9aa277999b3a11b7ea6956DdF5c61",
    abi: ConetGuardianNodesV6,
  },
  ClaimableConetPoint: {
    address: "0x6C7C575010F86A311673432319299F3D68e4b522",
    abi: ClaimableConetPointAbi,
  },
  FaucetV3: {
    address: "0x04CD419cb93FD4f70059cAeEe34f175459Ae1b6a",
    abi: FaucetV3Abi,
  },
  ConetStorage: {
    address: "0x20f8B4De2922d2e9d83B73f4561221d9278Af181",
    abi: ConetStorageAbi,
  },
};

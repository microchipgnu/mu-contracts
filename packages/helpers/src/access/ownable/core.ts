import { near, assert } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
import { TransferOwnershipLog } from "./events";

type OwnableArgs = {
  owner: AccountId;
};

class Ownable {
  owner: AccountId;

  constructor(args: OwnableArgs) {
    const { owner } = args;
    this._transfer_ownership({ address: owner });
  }

  transfer_ownership({ address }: { address: AccountId }) {
    assert(
      this.is_owner({ address }) === true,
      `Address ${address} is not the owner of contract.`
    );

    const previous_owner_id = this.owner;

    this._transfer_ownership({ address });

    new TransferOwnershipLog(previous_owner_id, address).emit();
  }

  _transfer_ownership({ address }: { address: AccountId }) {
    this.owner = address;
  }

  is_owner({ address }: { address: AccountId }) {
    return address === this.owner;
  }
}

export default Ownable;

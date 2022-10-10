import { near, call, view, assert, NearBindgen } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";

class Ownable {
  owner: AccountId;

  constructor() {
    this.owner = near.signerAccountId();
  }

  transferOwnership({ address }: { address: AccountId }) {
    this._transferOwnership({ address });
  }

  _transferOwnership({ address }: { address: AccountId }) {
    this.owner = address;
  }

  is_owner({ address }: { address: AccountId }) {
    assert(address === this.owner, "Address is not owner.");
  }
}

export default Ownable;

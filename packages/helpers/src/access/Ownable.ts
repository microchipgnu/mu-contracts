import { near, call, view, assert } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
class Ownable {
  owner: AccountId;

  constructor() {
    this.owner = near.signerAccountId();
  }

  @call({})
  transferOwnership({ address }: { address: AccountId }) {
    this._transferOwnership({ address });
  }

  @call({ privateFunction: true })
  _transferOwnership({ address }: { address: AccountId }) {
    this.owner = address;
  }

  @view({})
  is_owner({ address }: { address: AccountId }) {
    assert(address === this.owner, "Address is not owner.");
  }

  @view({})
  get_owner() {
    return this.owner;
  }
}

export default Ownable;

import { near, call, view, assert, NearBindgen } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";

@NearBindgen({ requireInit: false })
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

  @call({})
  is_owner({ address }: { address: AccountId }) {
    assert(address === this.get_owner(), "Address is not owner.");
  }

  @view({})
  get_owner() {
    return this.owner;
  }
}

export default Ownable;

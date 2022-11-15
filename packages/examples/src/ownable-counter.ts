import { NearBindgen, near, call, view, assert, initialize } from "near-sdk-js";
import { isUndefined } from "lodash-es";
import { Mixin, Ownable, Pausable } from "@microlabs/helpers";
import { AccountId } from "near-sdk-js/lib/types";

@NearBindgen({ requireInit: true })
export class Counter {
  count = 0;
  ownable: Ownable;

  @initialize({})
  init({ owner }: { owner: AccountId }) {
    this.ownable = new Ownable({ owner: owner });

    near.log(this.ownable)
  }

  @call({})
  increase({ n = 1 }: { n: number }) {
    const is_owner = this.ownable.is_owner({ address: near.signerAccountId() });

    assert(is_owner === true, "NOT OWNER");

    this.count += n;
    near.log(`Counter increased to ${this.count}`);
  }

  @call({})
  decrease({ n }: { n: number }) {
    // you can use default argument `n=1` too
    // this is to illustrate a npm dependency: lodash can be used
    if (isUndefined(n)) {
      this.count -= 1;
    } else {
      this.count -= n;
    }
    // this is to illustrate import a local ts module
    near.log(`Counter decreased to ${this.count}`);
  }

  @view({})
  get_count(): number {
    return this.count;
  }
}

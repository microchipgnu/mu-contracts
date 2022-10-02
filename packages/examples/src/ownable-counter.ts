import { NearBindgen, near, call, view } from "near-sdk-js";
import { isUndefined } from "lodash-es";
import { Ownable } from "@microlabs/helpers";

@NearBindgen({})
export class Counter extends Ownable {
  count = 0;

  constructor() {
    super();
  }

  @call({})
  increase({ n = 1 }: { n: number }) {
    this.is_owner({ address: near.signerAccountId() });
    this.count += n;
    near.log(`Counter increased to ${this.count}`);
  }

  @call({})
  decrease({ n }: { n: number }) {
    this.is_owner({ address: near.signerAccountId() });
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
  getCount(): number {
    return this.count;
  }
}

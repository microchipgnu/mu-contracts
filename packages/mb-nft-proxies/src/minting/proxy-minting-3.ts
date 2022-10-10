import { NearBindgen, near, call } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
@NearBindgen({ requireInit: false })
class Proxy3 {
  @call({ payableFunction: true })
  mint() {
    const deposit = near.attachedDeposit();
    const signer_id = near.signerAccountId();

    near.log(deposit, signer_id);
  }
}

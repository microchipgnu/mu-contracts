import {
  NearBindgen,
  near,
  call,
  LookupMap,
  bytes,
  NearPromise,
  assert,
  view,
} from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
@NearBindgen({ requireInit: false })
class Proxy2 {
  initial_hour: number;
  threshold: number;

  constructor() {
    const unix_epoch_sec = Math.floor(
      Number(near.blockTimestamp() / BigInt(1000000000))
    );

    this.initial_hour = new Date(unix_epoch_sec * 1000).getUTCHours();
    this.threshold = 1;
  }

  @call({})
  set_initial_hour({ hour }: { hour: number }) {
    // this.is_owner({ address: near.signerAccountId() });
    this.initial_hour = hour;
  }

  @call({})
  set_threshold({ threshold }: { threshold: number }) {
    // this.is_owner({ address: near.signerAccountId() });

    this.threshold = threshold;
  }

  @call({})
  mint() {
    const block_timestamp_sec = Math.floor(
      Number(near.blockTimestamp() / BigInt(1000000000))
    );

    const current_hour = new Date(block_timestamp_sec * 1000).getUTCHours();

    if (
      current_hour <= this.initial_hour + this.threshold &&
      current_hour >= this.initial_hour - this.threshold
    ) {
      return true;
    }

    return false;
  }

  @call({ privateFunction: true })
  cb_mint({
    latest_minter_id,
    nft_contract_id,
  }: {
    latest_minter_id: AccountId;
    nft_contract_id: AccountId;
  }) {
    if (near.promiseResultsCount() == BigInt(1)) {
      near.log("Promise was successful!");

      return true;
    } else {
      near.log("Promise failed...");
      return false;
    }
  }

  @view({})
  get_initial_hour() {
    return this.initial_hour;
  }

  @view({})
  get_threshold() {
    return this.threshold;
  }
}

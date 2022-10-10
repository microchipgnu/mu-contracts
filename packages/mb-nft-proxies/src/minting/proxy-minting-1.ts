import {
  NearBindgen,
  near,
  call,
  LookupMap,
  bytes,
  NearPromise,
} from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";

// This is a proxy contract that aims to mint non-fungible tokens
// on Mintbase NFT contracts on behalf of users.
// This contract also creates a LookupMap to keep track of the latest minter.
// This way whenever there is a new minted token for a certain NFT contract,
// the previous minter will become its owner.

// Mintbase contracts follow a role-based permission system in which `minters`
// are only allowed to mint on the contract. This contract opens up the Mintbase
// contract for minting by simply granting this contract's as a minter.
@NearBindgen({ requireInit: false })
class Proxy1 {
  // @ts-ignore
  latest_minters: LookupMap<AccountId>;

  constructor() {
    this.latest_minters = new LookupMap("latest-minters-map");
  }

  // Public minting method.
  // `reference` is generally an Arweave transaction hash. This is commonly used by Mintbase.
  // `nft_contract_id` is the Mintbase NFT contract address.
  @call({})
  mint({
    reference,
    nft_contract_id,
  }: {
    reference: string;
    nft_contract_id: AccountId;
  }) {
    let prev_minter_id = this.latest_minters.get(nft_contract_id);
    const minter_id = near.signerAccountId();

    if (!prev_minter_id) prev_minter_id = minter_id;

    // Let's create a promise that calls the minting method
    // of an arbitrary Mintbase NFT contract.
    const promise = NearPromise.new(nft_contract_id)
      .functionCall(
        "nft_batch_mint",
        bytes(
          JSON.stringify({
            owner_id: prev_minter_id,
            metadata: {
              title: null,
              description: null,
              media: null,
              media_hash: null,
              copies: null,
              expires_at: null,
              starts_at: null,
              extra: null,
              reference: reference,
              reference_hash: null,
            },
            num_to_mint: 1,
            royalty_args: {
              split_between: {
                [minter_id]: 10000,
              },
              percentage: 1000,
            },
            split_owners: null,
          })
        ),
        BigInt("1"),
        BigInt("150000000000000")
      )
      .then(
        NearPromise.new(near.currentAccountId()).functionCall(
          "cb_mint",
          bytes(
            JSON.stringify({
              latest_minter_id: minter_id,
              nft_contract_id: nft_contract_id,
            })
          ),
          BigInt(0),
          BigInt("50000000000000")
        )
      );

    return promise.asReturn();
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

      // If promise is successful, set the latest minter in the lookup map
      this.latest_minters.set(nft_contract_id, latest_minter_id);

      return true;
    } else {
      near.log("Promise failed...");
      return false;
    }
  }
}

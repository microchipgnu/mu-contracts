// import { UnorderedMap, LookupMap, Bytes, near, UnorderedSet, assert } from 'near-sdk-js/lib/index'
// import { PromiseResult } from 'near-sdk-js/lib/types/index'
// import { assertOneYocto, IntoStorageKey, Option } from 'near-sdk-js/lib/utils'
// import { TokenMetadata } from '../metadata'
// import { hash_account_id, refund_approved_account_ids, refund_deposit, refund_deposit_to_account } from '../utils'
// import { NftMint, NftTransfer } from '../events'
// import { NonFungibleTokenResolver } from './resolver'

import { AccountId } from "near-sdk-js/lib/types/";

import { Token, TokenId } from "../token";

export interface NonFungibleTokenCore {
  nft_transfer(
    receiver_id: AccountId,
    token_id: TokenId,
    approval_id?: bigint,
    memo?: string
  );
  nft_transfer_call(
    receiver_id: AccountId,
    token_id: TokenId,
    approval_id?: bigint,
    memo?: string,
    ms?: string
  );
  nft_token(token_id: TokenId);
}

export class NonFungibleToken {
  cenas() {}
}

import { call, LookupMap, NearBindgen, view, near } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
import { event_json } from "./events";
import { TokenMetadata, ContractMetadata } from "./types";

const tokens_map_key = "t";

class Token {
  token_id: string;
  owner_id: AccountId;
  metadata: TokenMetadata;

  constructor({
    token_id,
    owner_id,
    metadata,
  }: {
    token_id: string;
    owner_id: AccountId;
    metadata: TokenMetadata;
  }) {
    this.token_id = token_id;
    this.owner_id = owner_id;
    this.metadata = metadata;
  }

  set_owner_id({ owner_id }: { owner_id: AccountId }) {
    this.owner_id = owner_id;
  }
}

class NftContract {
  // @ts-ignore
  tokens: LookupMap<string, Token>;
  constructor() {
    this.tokens = new LookupMap(tokens_map_key);
  }

  @call({})
  nft_transfer({
    receiver_id,
    token_id,
    approval_id,
    memo,
  }: {
    receiver_id: AccountId;
    token_id: string;
    approval_id: number;
    memo: string;
  }) {
    const token = this.tokens.get(token_id) as Token;
    token.set_owner_id({ owner_id: receiver_id });
  }

  @call({})
  nft_transfer_call() {}

  @call({})
  nft_resolve_transfer() {}

  @call({})
  nft_mint({
    token_id,
    owner_id,
    metadata,
  }: {
    token_id: string;
    owner_id: AccountId;
    metadata: TokenMetadata;
  }) {
    const token = new Token({ token_id, owner_id, metadata });
    this.tokens.set(token_id, token);

    event_json({
      data: [
        {
          owner_id: owner_id,
          token_ids: [token_id],
        },
      ],
      event: "nft_mint",
    });
  }

  @view({})
  nft_token({ token_id }: { token_id: string }) {
    return this.tokens.get(token_id);
  }
}

export default NftContract;

import { TokenMetadata } from "./metadata";
import { AccountId } from "near-sdk-js/lib/types";

export type TokenId = string;
export class Token {
  constructor(
    public token_id: TokenId,
    public owner_id: AccountId,
    public metadata?: TokenMetadata,
    public approved_account_ids?: Map<AccountId, bigint>
  ) {}
}

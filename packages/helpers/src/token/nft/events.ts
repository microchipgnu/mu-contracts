import { near } from "near-sdk-js";

export interface NftMintLog {
  owner_id: string;
  token_ids: string[];
  memo?: string;
}

export interface NftBurnLog {
  owner_id: string;
  authorized_id?: string;
  token_ids: string[];
  memo?: string;
}

export interface NftTransferLog {
  authorized_id?: string;
  old_owner_id: string;
  new_owner_id: string;
  token_ids: string[];
  memo?: string;
}

export type EventJson = {
  standard?: string;
  version?: string;
  event: string;
  data: NftMintLog[] | NftBurnLog[] | NftTransferLog[];
};

export const event_json = (args: EventJson) => {
  const { standard = "nep171", version = "1.0.0", event, data } = args;

  const event_data = {
    standard: standard,
    version: version,
    event: event,
    data: data,
  };

  near.log(`EVENT_JSON: ${JSON.stringify(event_data)}`);
};

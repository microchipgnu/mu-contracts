export type TokenMetadata = {
  title: string | null;
  description: string | null;
  media: string | null;
  media_hash: string | null;
  copies: number | null;
  issued_at: number | null;
  expires_at: number | null;
  starts_at: number | null;
  updated_at: number | null;
  extra: string | null;
  reference: string | null;
  reference_hash: string | null;
};

export type ContractMetadata = {
  spec: string;
  name: string;
  symbol: string;
  icon: string | null;
  base_uri: string | null;
  reference: string | null;
  reference_hash: string | null;
};

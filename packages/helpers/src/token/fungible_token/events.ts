import { NearEvent } from "../../events";
import {} from "near-sdk-js/lib/utils";

export type FtEventKind = FtMintLog[] | FtBurnLog[] | FtTransferLog[];

export class Nep141Event extends NearEvent {
  standard: string;
  version: string;
  event: FtEventKind;

  constructor({
    version,
    event,
    standard,
  }: {
    version: string;
    standard: string;
    event: FtEventKind;
  }) {
    super();

    this.standard = standard;
    this.version = version;
    this.event = event;
  }
}

export class FtMintLog {
  constructor(
    public owner_id: string,
    public amount: string,
    public memo?: string
  ) {}

  emit() {
    FtMintLog.emit_many([this]);
  }

  static emit_many(data: FtMintLog[]) {
    new_141({ event: data, version: "1.0.0", standard: "" }).emit();
  }
}

export class FtBurnLog {
  constructor(
    public owner_id: string,
    public amount: string,
    public memo?: string
  ) {}

  emit() {
    FtBurnLog.emit_many([this]);
  }

  static emit_many(data: FtBurnLog[]) {
    new_141({ event: data, version: "1.0.0", standard: "" }).emit();
  }
}

export class FtTransferLog {
  constructor(
    public old_owner_id: string,
    public new_owner_id: string,
    public amount: string,
    public memo?: string
  ) {}

  emit() {
    FtTransferLog.emit_many([this]);
  }

  static emit_many(data: FtTransferLog[]) {
    new_141({ event: data, version: "1.0.0", standard: "" }).emit();
  }
}

function new_141({
  version,
  event,
  standard,
}: {
  version: string;
  standard: string;
  event: FtEventKind;
}): NearEvent {
  return new Nep141Event({
    version: version,
    standard: standard,
    event: event,
  });
}

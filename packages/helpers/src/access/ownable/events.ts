import { AccountId } from "near-sdk-js/lib/types";
import { NearEvent } from "../../events";

export type EventKind = TransferOwnershipLog[];

export class OwnableEvent extends NearEvent {
  standard: string;
  version: string;
  event: EventKind;

  constructor({
    version,
    event,
    standard,
  }: {
    version: string;
    standard: string;
    event: EventKind;
  }) {
    super();

    this.standard = standard;
    this.version = version;
    this.event = event;
  }
}

export class TransferOwnershipLog {
  constructor(
    public previous_owner_id: AccountId,
    public new_owner_id: AccountId
  ) {}

  emit() {
    TransferOwnershipLog.emit_many([this]);
  }

  static emit_many(data: TransferOwnershipLog[]) {
    new OwnableEvent({
      event: data,
      version: "1.0.0",
      standard: "",
    }).emit();
  }
}

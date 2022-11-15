import { AccountId } from "near-sdk-js/lib/types";
import { NearEvent } from "../../events";

export type EventKind =
  | RoleAdminChangedLog[]
  | RoleGrantedLog[]
  | RoleRevokedLog[];

export class AccessControlEvent extends NearEvent {
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

export class RoleAdminChangedLog {
  constructor(
    public role_id: string,
    public previous_admin_role_id: string,
    public new_admin_role_id?: string
  ) {}

  emit() {
    RoleAdminChangedLog.emit_many([this]);
  }

  static emit_many(data: RoleAdminChangedLog[]) {
    new AccessControlEvent({
      event: data,
      version: "1.0.0",
      standard: "",
    }).emit();
  }
}

export class RoleGrantedLog {
  constructor(
    public role_id: string,
    public account_id: AccountId,
    public sender: AccountId
  ) {}

  emit() {
    RoleGrantedLog.emit_many([this]);
  }

  static emit_many(data: RoleGrantedLog[]) {
    new AccessControlEvent({
      event: data,
      version: "1.0.0",
      standard: "",
    }).emit();
  }
}

export class RoleRevokedLog {
  constructor(
    public role_id: string,
    public account_id: AccountId,
    public sender: AccountId
  ) {}

  emit() {
    RoleRevokedLog.emit_many([this]);
  }

  static emit_many(data: RoleRevokedLog[]) {
    new AccessControlEvent({
      event: data,
      version: "1.0.0",
      standard: "",
    }).emit();
  }
}

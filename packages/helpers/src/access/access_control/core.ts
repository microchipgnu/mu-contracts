import { LookupMap, near } from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";
import { Mixin } from "../../utils/Mixer";
import Ownable from "../Ownable";
import { RoleGrantedLog } from "./events";

type RoleId = string;
type RoleArgs = {
  id: string;
  adminRoleId: string;
};

const DEFAULT_ADMIN_ROLE_ID = "";

class Role {
  id: string;
  adminRoleId: string;
  constructor(args: RoleArgs) {
    const { id, adminRoleId } = args;
    this.id = id;
    this.adminRoleId = adminRoleId;
  }
}

class AccessControl {
  // @ts-ignore
  roles: LookupMap<RoleId, Role>;
  // @ts-ignore
  members: LookupMap<AccountId, RoleId>;

  constructor() {
    // @ts-ignore
    this.roles = new LookupMap<RoleId, Role>("roles");
    // @ts-ignore
    this.members = new LookupMap<AccountId, RoleId>("members");
  }

  create_role(roleId: RoleId, adminRoleId: RoleId) {
    const role = new Role({
      id: roleId,
      adminRoleId: adminRoleId,
    });

    this.roles.set(roleId, role);
  }

  grant_role(roleId: RoleId, accountId: AccountId) {
    const signer = near.signerAccountId();

    // TODO: verify is roleId exists

    this.members.set(accountId, roleId);

    new RoleGrantedLog(roleId, accountId, signer).emit();
  }

  // signer has access to revoke role
  revoke_role(roleId: RoleId, accountId: AccountId) {
    this.members.remove(accountId);
  }

  // signer has access to renounce role
  renounce_role() {}

  is_admin(roleId: RoleId, accountId: AccountId): boolean {
    return false;
  }

  has_role(roleId: RoleId, accountId: AccountId): boolean {
    const role = this.roles.get(roleId);
    const memberRoleId = this.members.get(accountId);

    return role === memberRoleId;
  }

  // TODO: currently only supports one role per account
  get_roles_by_account_id() {}
}

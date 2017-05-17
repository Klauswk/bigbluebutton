import { check } from 'meteor/check';

let AclSingleton;

export class Acl {

  /**
   * @param {object} aclConfig
   * @param {object} Users 
   */
  constructor(aclConfig, Users) {
    check(aclConfig, Object);

    this.Users = Users;
    this.aclConfig = aclConfig;
  }

  /**
   * @param {string} permissionName - The name of the permission 
   * @param {string} actionName - Read/Write
   * @param {object} credentials - The users creedentials
   * @return An boolean which inform if the action is allowed.
   */
  isAllowedTo(permissionName, actionName, credentials) {
    check(credentials, Object);
    check(actionName, String);
    check(permissionName, String);

    const meetingId = credentials.meetingId;
    const userId = credentials.requesterUserId;
    const authToken = credentials.requesterToken;

    const user = this.Users.findOne({
      meetingId,
      userId,
    });

    if (!user.role) {
      return false;
    }

    let role = isUserInRole(this.aclConfig, user.role);

    if (role) {
      return canPerformAction(permissionName, actionName, role);
    }
    return false;
  }

  /**
   * Check if the user have the permission to execute the action
   * @param {string} permissionName 
   * @param {string} actionName 
   * @param {object} role 
   * @return {Boolean} return the action permission.
   */
  canPerformAction(permissionName, actionName, role) {
    check(role, Object);
    check(actionName, String);
    check(permissionName, String);

    const permission = role[permissionName];

    if (permission) {
      return permission[actionName];
    }
    return false;
  }

  /**
   * Check if the role exist.
   * @param {object} acl 
   * @param {string} userRole
   * @return {object} the role object, or undefined if not found.  
   */
  roleExist(acl, userRole) {
    check(acl, Object);
    check(userRole, String);
    return acl[userRole];
  }
}

export default (function () {
  if (!AclSingleton) {
    import Users from '/imports/api/users';
    AclSingleton = new Acl(Meteor.settings.public.acl, Users);
  }
  return AclSingleton;
})();
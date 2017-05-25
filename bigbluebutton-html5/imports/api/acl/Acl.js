import { check } from 'meteor/check';

/**
 * Class that represent the System Acl, both for server and client
 * 
 * The write option overlap the read
 * @example (read = true, write = false) ask for read, result true
 * @example (read = false, write = false) ask for read, result false
 * @example (read = false, write = true) ask for read, result true
 */
export class Acl {

  /**
   * @param {object} aclConfig
   * @param {object} Users 
   */
  constructor(aclConfig, Users) {
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
    if(!credentials){
      return false;
    }
    check(actionName, String);
    check(permissionName, String);

    const meetingId = credentials.meetingId;
    const userId = credentials.requesterUserId;
    const authToken = credentials.requesterToken;

    const user = this.Users.findOne({
      meetingId,
      userId,
    });

    if (!user.user.role) {
      return false;
    }

    let role = this.roleExist(this.aclConfig, user.user.role);

    if (role) {
      return this.canPerformAction(permissionName, actionName, role);
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
      let action = permission[actionName];

      //check if the action exist
      if (action !== undefined) {
        return (!!action || permission.write);
      }
      return false;
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
    return acl[userRole.toLowerCase()];
  }
}

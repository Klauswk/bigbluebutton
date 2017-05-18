import { Acl } from './Acl';

let AclSingleton;

export default (function () {
  if (!AclSingleton) {
    AclSingleton = new Acl(Meteor.settings.public.acl, Users);
  }
  return AclSingleton;
})();

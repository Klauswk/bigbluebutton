const expect = require('expect.js');
import {
  Acl
} from '../Acl';

describe('Acl Tests', function () {

  describe('Viewer Tests', function () {
    let acl;
    beforeEach(function () {
      acl = new Acl(aclConfig, UsersViewer);
    });

    it('Expect return false for inexistent permission', function () {
      expect(acl.isAllowedTo("foo", "write", mockCredentials)).to.be(false);
    });

    it('Expect return false for inexistent action', function () {
      expect(acl.isAllowedTo("chatPublic", "foo", mockCredentials)).to.be(false);
    });

    it('Expect return true for chatPublic', function () {
      expect(acl.isAllowedTo("chatPublic", "write", mockCredentials)).to.be(true);
    });

    it('Expect return true for presentation read and false for write', function () {
      expect(acl.isAllowedTo("presentation", "read", mockCredentials)).to.be(true);
      expect(acl.isAllowedTo("presentation", "write", mockCredentials)).to.be(false);
    });
  });

  describe('Moderator Tests', function () {
    let acl;
    beforeEach(function () {
      acl = new Acl(aclConfig, UsersModerator);
    });

    it('Expect return false for inexistent permission', function () {
      expect(acl.isAllowedTo("foo", "write", mockCredentials)).to.be(false);
    });

    it('Expect return false for inexistent action', function () {
      expect(acl.isAllowedTo("chatPublic", "foo", mockCredentials)).to.be(false);
    });

    it('Expect return true for chatPublic', function () {
      expect(acl.isAllowedTo("chatPublic", "write", mockCredentials)).to.be(true);
    });

    it('Expect return true for presentation read and write', function () {
      expect(acl.isAllowedTo("presentation", "read", mockCredentials)).to.be(true);
      expect(acl.isAllowedTo("presentation", "write", mockCredentials)).to.be(true);
    });
  });
});

const UsersViewer = {};

UsersViewer.findOne = function () {
  return {
    user: {
      role: "viewer"
    }
  };
}

const UsersModerator = {};

UsersModerator.findOne = function () {
  return {
    user: {
      role: "moderator"
    }
  };
}

const aclConfig = {
  "viewer": {
    "chatPublic": {
      "write": true,
      "read": true
    },
    "presentation": {
      "write": false,
      "read": true
    }
  },
  "moderator": {
    "chatPublic": {
      "write": true,
      "read": true
    },
    "chatPrivate": {
      "write": true,
      "read": true
    },
    "presentation": {
      "write": true,
      "read": false
    },
    "lockSetting": {
      "write": true,
      "read": false
    }
  }
};

const mockCredentials = {
  meetingId: "meetingId",
  requesterUserId: "requesterUserId",
  requesterToken: "requesterToken"
};
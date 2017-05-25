import { Meteor } from 'meteor/meteor';
import Acl from '/imports/startup/acl';
import Polls from '/imports/api/polls';
import { check } from 'meteor/check';
import { logger } from '/imports/startup/server/logger';

Meteor.publish('polls', function(credentials) {
  //checking if it is allowed to see Poll Collection in general
  if (!Acl.isAllowedTo('poll','write', credentials) || !Acl.isAllowedTo('pollVote','write', credentials)) {
    this.ready();
  }

  const { meetingId, requesterUserId, requesterToken } = credentials;

  check(meetingId, String);
  check(requesterUserId, String);
  check(requesterToken, String);

  const selector = {
    meetingId: meetingId,
    users: requesterUserId,
  };

  let options = {};

  if (!Acl.isAllowedTo('pollVote','write', credentials)) {
    options = {
      fields: {
        'poll.answers.num_votes': 0,
      },
    };
  }

  return Polls.find(selector, options);
});

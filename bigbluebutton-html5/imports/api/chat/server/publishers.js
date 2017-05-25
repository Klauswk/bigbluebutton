import Chat from '/imports/api/chat';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import Acl from '/imports/startup/acl';

Meteor.publish('chat', function(credentials) {
  if (!Acl.isAllowedTo('chatPublic','read', credentials) && !Acl.isAllowedTo('chatPrivate','read', credentials)) {
    this.ready();
  }

  const CHAT_CONFIG = Meteor.settings.public.chat;
  const PUBLIC_CHAT_TYPE = CHAT_CONFIG.type_public;

  const { meetingId, requesterUserId, requesterToken } = credentials;

  check(meetingId, String);
  check(requesterUserId, String);
  check(requesterToken, String);

  Logger.info(`Publishing chat for ${meetingId} ${requesterUserId} ${requesterToken}`);

  return Chat.find({
    $or: [
      {
        'message.chat_type': PUBLIC_CHAT_TYPE,
        meetingId,
      }, {
        'message.from_userid': requesterUserId,
        meetingId,
      }, {
        'message.to_userid': requesterUserId,
        meetingId,
      },
    ],
  });
});

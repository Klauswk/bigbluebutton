import Polls from '/imports/api/polls';
import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';

export default function publishPoll(poll, meetingId) {
  check(meetingId, String);
  check(poll, Object);

  const {
    id,
    answers,
  } = poll;

  const selector = {
    meetingId,
    'poll.id': id,
  };

  const modifier = {
    $set: {
      meetingId,
      poll,
      publish: true,
    },
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`Updating Polls collection: ${err}`);
    }

    Logger.info(`Updating Polls collection (meetingId: ${meetingId}, pollId: ${id}!)`);
  };

  return Polls.update(selector, modifier, cb);
};

import { check } from 'meteor/check';
import publishPoll from '../modifiers/publishPoll';

export default function pollStopped({ payload }) {
  check(payload, Object);

  const meetingId = payload.meeting_id;
  const poll = payload.poll;

  check(meetingId, String);

  if (poll) {
    const pollId = poll.id;

    check(pollId, String);

    return publishPoll(poll,meetingId, pollId);
  }
}

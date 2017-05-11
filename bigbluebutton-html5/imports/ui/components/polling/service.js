import { makeCall } from '/imports/ui/services/api';
import Polls from '/imports/api/polls';

let pollVoted = false;

let mapPolls = function () {
  let poll = Polls.findOne();

  if (!poll) {
    return { pollExists: false, pollVoted, publish: false };
  }else if(!poll.publish && pollVoted){
    return { pollExists: false, pollVoted,  publish: false };
  }else if(poll.publish){
    return { pollExists: false, pollVoted,  publish: true };
  }

  const amIRequester = poll.requester != 'userId';

  pollVoted = false;

  return {
    poll: {
      answers: poll.poll.answers,
      pollId: poll.poll.id,
      published: poll.published
    },
    pollExists: true,
    amIRequester: amIRequester,
    handleVote: function (pollId, answerId) {
      makeCall('publishVote', pollId, answerId.id);
      pollVoted = true;
    },
  };
};

export default { mapPolls };

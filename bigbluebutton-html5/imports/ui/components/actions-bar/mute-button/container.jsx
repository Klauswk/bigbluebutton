import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { makeCall } from '/imports/ui/services/api';
import Button from '/imports/ui/components/button/component';
import Users from '/imports/api/1.1/users/index';
import Auth from '/imports/ui/services/auth/index';
import MuteAudio from './component';

class MuteAudioContainer extends React.Component {
  render() {
    return (
      <MuteAudio {...this.props} />
    );
  }
}

export default createContainer((params) => {
  const userId = Auth.userID;
  const user = Users.findOne({ userId }).user;
  const isMuted = user.voiceUser.muted;
  const isInAudio = user.voiceUser.joined;
  const isTalking = user.voiceUser.talking;

  let callback = () => { };

  if (isInAudio && !isMuted) {
    callback = () => makeCall('muteUser', userId);
  }

  if (isInAudio && isMuted) {
    callback = () => makeCall('unmuteUser', userId);
  }

  const data = {
    isInAudio,
    isMuted,
    callback,
    isTalking,
  };
  return data;
}, MuteAudioContainer);

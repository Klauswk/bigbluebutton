import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import AudioTest from './component';
import IosHandler from '/imports/ui/services/ios-handler';

class AudioTestContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AudioTest {...this.props}>
        {this.props.children}
      </AudioTest>
    );
  }
}

export default createContainer(() => ({
  handlePlayAudioSample: () => {
    console.log('handlePlayAudioSample');
    const snd = new Audio('resources/sounds/audioSample.mp3');
    snd.play();
  },
}), AudioTestContainer);

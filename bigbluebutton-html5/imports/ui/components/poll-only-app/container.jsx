import React from 'react';
import PollingService from '/imports/ui/components/polling/service';
import { createContainer } from 'meteor/react-meteor-data';
import PollingComponent from '/imports/ui/components/poll-only-app/component.jsx';
import PollResult from '/imports/ui/components/poll-only-app/poll-result/component.jsx';
import PollWaiting from '/imports/ui/components/poll-only-app/poll-waiting/component'
import { defineMessages, injectIntl } from 'react-intl';

const intlMessages = defineMessages({
  waitingPollLabel: {
    id: 'app.pollWaiting.waitingPollLabel',
    defaultMessage: 'Waiting for poll to begin',
  },
  waitingPollResultLabel: {
    id: 'app.pollWaiting.waitingPollResultLabel',
    defaultMessage: 'Waiting for the pull results',
    
  }
});

class PollOnlyContainer extends React.Component {
  render() {

    const { intl } = this.props;

    if (this.props.pollExists) {
      return <PollingComponent poll={this.props.poll} handleVote={this.props.handleVote} />;
    } else if (this.props.publish) {
      return <PollResult poll={this.props.poll}/>
    } else if (this.props.pollVoted) {
      return <PollWaiting label={intl.formatMessage(intlMessages.waitingPollResultLabel)}/>
    } else {
      return <PollWaiting label={intl.formatMessage(intlMessages.waitingPollLabel)}/>;
    }
  }
}

export default injectIntl(createContainer(() => {
  const data = PollingService.mapPolls();
  return data;
},PollOnlyContainer));

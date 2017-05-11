import React from 'react';
import PollingService from '/imports/ui/components/polling/service';
import { createContainer } from 'meteor/react-meteor-data';
import PollingComponent from '/imports/ui/components/poll-only-app/component.jsx';
import PollWaiting from '/imports/ui/components/poll-waiting/component'
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

    console.log("this.props",this.props);

    if (this.props.pollExists) {
      return <PollingComponent poll={this.props.poll} handleVote={this.props.handleVote} />;
    } else if (this.props.pollVoted) {
      return <PollWaiting label={intl.formatMessage(intlMessages.waitingPollResultLabel)}/>
    } else if (this.props.publish) {
      return (<div>Mostrando resultadinho!</div>);
    } else {
      return <PollWaiting label={intl.formatMessage(intlMessages.waitingPollLabel)}/>;
    }
  }
}

export default injectIntl(createContainer(() => {
  const data = PollingService.mapPolls();
  console.log("mudou algo");
  return data;
},PollOnlyContainer));

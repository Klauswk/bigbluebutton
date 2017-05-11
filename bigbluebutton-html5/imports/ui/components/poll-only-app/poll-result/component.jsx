import React from 'react';
import styles from './styles.scss';
import { defineMessages, injectIntl } from 'react-intl';
import Answer from './answer/component';

const intlMessages = defineMessages({
  pollResultTitle: {
    id: 'app.pollResult.title',
    description: 'Title label for poll result',
  },
});

class PollResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { intl } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.message}>
          <i>{intl.formatMessage(intlMessages.pollResultTitle)}</i>
          <div className={styles.card}>
            {this.props.poll.answers.map((answer) => (
              <Answer numResponders={this.props.poll.num_responders} answer={answer}
                key={answer.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default injectIntl(PollResult);

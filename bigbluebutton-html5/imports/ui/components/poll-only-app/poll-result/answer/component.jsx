import React from 'react';
import styles from './styles.scss';
import { defineMessages, injectIntl } from 'react-intl';

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { numResponders, answer} = this.props;

    return (
      <div className={styles.content}>
        <label className={styles.question}>{answer.key}</label>
        <label className={styles.percent}>{numResponders > 0 ? `${(100*answer.num_votes / numResponders).toFixed(2)}%` : "0%"}</label>
      </div>
    );
  }
};

export default Answer;

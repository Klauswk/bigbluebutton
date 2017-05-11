import React from 'react';
import Button from '/imports/ui/components/button/component';
import Icon from '/imports/ui/components/icon/component'
import styles from './styles.scss';
import { defineMessages, injectIntl } from 'react-intl';

class PollingWaiting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.background}>
          <div className={styles.message}>
            <Icon className={styles.icon} iconName="polling" />
          </div>
          <i className={styles.message}>{label}</i>
          <div className={styles.spinner}>
            <div className={styles.bounce1}></div>
            <div className={styles.bounce2}></div>
            <div className={styles.bounce3}></div>
          </div>
        </div>
      </div>
    );
  }
};

export default PollingWaiting;

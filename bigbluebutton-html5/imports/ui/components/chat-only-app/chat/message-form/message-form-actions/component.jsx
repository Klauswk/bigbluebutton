import React, { PropTypes } from 'react';
import styles from './styles';

import Icon from '/imports/ui/components/icon/component';
import BaseButton from '/imports/ui/components/button/base/component';

const propTypes = {
  ...BaseButton.propTypes,
};

const defaultProps = {
  ...BaseButton.defaultProps,
};

export default class MessageFormActions extends BaseButton {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BaseButton {...this.props}>
        <Icon iconName={'add'} />
      </BaseButton>
    );
  }
};

MessageFormActions.propTypes = propTypes;
MessageFormActions.defaultProps = defaultProps;

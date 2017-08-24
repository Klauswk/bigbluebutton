import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KEY_CODES from '/imports/utils/keyCodes';
import styles from './../styles.scss';
import UserParticipants from './user-participants/component';
import UserMessages from './user-messages/component';

const propTypes = {
  openChats: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  compact: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  meeting: PropTypes.object,
  isBreakoutRoom: PropTypes.bool,
  makeCall: PropTypes.func.isRequired,
  getAvailableActions: PropTypes.func.isRequired,
  normalizeEmojiName: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
  isBreakoutRoom: false,
  // This one is kinda tricky, meteor takes sometime to fetch the data and passing down
  // So the first time its create, the meeting comes as null, sending an error to the client.
  meeting: {},
};

class UserContent extends Component {

  constructor(props) {
    super(props);

    this.rovingIndex = this.rovingIndex.bind(this);
    this.focusList = this.focusList.bind(this);
    this.focusedItemIndex = -1;
  }

  focusList(list) {
    const focusList = list;
    document.activeElement.tabIndex = -1;
    this.focusedItemIndex = -1;
    focusList.tabIndex = 0;
    focusList.focus();
  }

  rovingIndex(event, list, items, numberOfItems) {
    const active = document.activeElement;
    const changedItems = items;

    const focusElement = () => {
      if (!active.getAttribute('role') === 'tabpanel') {
        active.tabIndex = -1;
      }
      changedItems.childNodes[this.focusedItemIndex].tabIndex = 0;
      changedItems.childNodes[this.focusedItemIndex].focus();
    };

    if (event.keyCode === KEY_CODES.ESCAPE
      || this.focusedItemIndex < 0
      || this.focusedItemIndex > numberOfItems) {
      this.focusList(list);
    }

    if ([KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_SPACE].includes(event.keyCode)) {
      active.firstChild.click();
    }

    if (event.keyCode === KEY_CODES.ARROW_DOWN) {
      this.focusedItemIndex += 1;

      if (this.focusedItemIndex === numberOfItems) {
        this.focusedItemIndex = 0;
      }
      focusElement();
    }

    if (event.keyCode === KEY_CODES.ARROW_UP) {
      this.focusedItemIndex -= 1;

      if (this.focusedItemIndex < 0) {
        this.focusedItemIndex = numberOfItems - 1;
      }

      focusElement();
    }
  }

  render() {
    return (
      <div className={styles.content}>
        <UserMessages
          openChats={this.props.openChats}
          compact={this.props.compact}
          intl={this.props.intl}
          rovingIndex={this.rovingIndex}
        />
        <UserParticipants
          users={this.props.users}
          compact={this.props.compact}
          intl={this.props.intl}
          currentUser={this.props.currentUser}
          meeting={this.props.meeting}
          isBreakoutRoom={this.props.isBreakoutRoom}
          makeCall={this.props.makeCall}
          getAvailableActions={this.props.getAvailableActions}
          normalizeEmojiName={this.props.normalizeEmojiName}
          rovingIndex={this.rovingIndex}

        />
      </div>
    );
  }
}

UserContent.propTypes = propTypes;
UserContent.defaultProps = defaultProps;

export default UserContent;
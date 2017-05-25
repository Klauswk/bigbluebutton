import Presentations from '/imports/api/presentations';
import Slides from '/imports/api/slides';
import { isVideoBroadcasting } from '../deskshare/service';
import Auth from '/imports/ui/services/auth';
import Acl from '/imports/startup/acl';

let getPresentationInfo = () => {
  let currentPresentation;
  currentPresentation = Presentations.findOne({
      'presentation.current': true,
    });

  return {
    current_presentation: (currentPresentation != null ? true : false),

  };
};

function shouldShowWhiteboard() {
  return Acl.isAllowedTo('whiteboard','read', Auth.credentials);
}

function shouldShowDeskshare() {
  return isVideoBroadcasting();
}

function shouldShowOverlay() {
  return false;
}

export default {
  getPresentationInfo,
  shouldShowWhiteboard,
  shouldShowDeskshare,
  shouldShowOverlay,
};

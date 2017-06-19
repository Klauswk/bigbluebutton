import mapToAcl from '/imports/startup/mapToAcl';
import { Meteor } from 'meteor/meteor';
import sendChat from './methods/sendChat';

Meteor.methods(mapToAcl(['methods.sendChat'], {
  sendChat,
}));

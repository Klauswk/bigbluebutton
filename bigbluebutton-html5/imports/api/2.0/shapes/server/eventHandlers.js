import RedisPubSub from '/imports/startup/server/redis';
import handleWhiteboardCleared from './handlers/whiteboardCleared';
import handleWhiteboardUndo from './handlers/whiteboardUndo';

RedisPubSub.on('ClearWhiteboardEvtMsg', handleWhiteboardCleared);
RedisPubSub.on('UndoWhiteboardEvtMsg', handleWhiteboardUndo);

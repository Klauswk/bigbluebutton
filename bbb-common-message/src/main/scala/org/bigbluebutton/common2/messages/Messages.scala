package org.bigbluebutton.common2.messages

import com.fasterxml.jackson.databind.JsonNode
import org.bigbluebutton.common2.messages.MessageBody._

object MessageTypes {
  val DIRECT = "DIRECT"
  val BROADCAST_TO_MEETING = "BROADCAST_TO_MEETING" // Send to all clients in the meeting
  val BROADCAST_TO_ALL = "BROADCAST_TO_ALL" // Send to all clients
  val SYSTEM = "SYSTEM"
}

// seal trait to force all classes that extends this trait to be defined in this file.
trait BbbCoreMsg
sealed trait BbbCommonMsg
trait BbbCoreHeader

trait StandardMsg extends BbbCoreMsg { def header: BbbClientMsgHeader }

case class RoutingEnvelope(msgType: String, meetingId: String, userId: String)
case class BbbMsgToClientEnvelope(name: String, routing: RoutingEnvelope)
case class BbbCoreEnvelope(name: String, routing: collection.immutable.Map[String, String])
case class BbbCommonEnvCoreMsg(envelope: BbbCoreEnvelope, core: BbbCoreMsg) extends BbbCommonMsg
case class BbbCommonEnvJsNodeMsg(envelope: BbbCoreEnvelope, core: JsonNode) extends BbbCommonMsg

case class BbbCoreBaseHeader(name: String) extends BbbCoreHeader
case class BbbCoreHeaderWithMeetingId(name: String, meetingId: String) extends BbbCoreHeader
case class BbbClientMsgHeader(name: String, meetingId: String, userId: String) extends BbbCoreHeader

case class BbbCoreMessageFromClient(header: BbbClientMsgHeader, body: JsonNode)

case class BbbCoreHeaderBody(header: BbbCoreHeader, body: JsonNode)

object CreateMeetingReqMsg { val NAME = "CreateMeetingReqMsg" }
case class CreateMeetingReqMsg(header: BbbCoreBaseHeader,
                               body: CreateMeetingReqMsgBody) extends BbbCoreMsg

object RegisterUserReqMsg { val NAME = "RegisterUserReqMsg" }
case class RegisterUserReqMsg(header: BbbCoreHeaderWithMeetingId,
                              body: RegisterUserReqMsgBody) extends BbbCoreMsg

object ValidateAuthTokenReqMsg { val NAME = "ValidateAuthTokenReqMsg" }
case class ValidateAuthTokenReqMsg(header: BbbClientMsgHeader,
                                   body: ValidateAuthTokenReqMsgBody) extends BbbCoreMsg


object UserJoinMeetingReqMsg { val NAME = "UserJoinMeetingReqMsg" }
case class UserJoinMeetingReqMsg(header: BbbClientMsgHeader, body: UserJoinMeetingReqMsgBody) extends BbbCoreMsg
case class UserJoinMeetingReqMsgBody(userId: String, authToken: String)

object UserLeaveReqMsg { val NAME = "UserLeaveReqMsg" }
case class UserLeaveReqMsg(header: BbbClientMsgHeader, body: UserLeaveReqMsgBody) extends BbbCoreMsg

object GetUsersReqMsg { val NAME = "GetUsersReqMsg" }
case class GetUsersReqMsg(header: BbbClientMsgHeader, body: GetUsersReqMsgBody) extends BbbCoreMsg

object UserBroadcastCamStartMsg { val NAME = "UserBroadcastCamStartMsg" }
case class UserBroadcastCamStartMsg(header: BbbClientMsgHeader, body: UserBroadcastCamStartMsgBody) extends BbbCoreMsg

object UserBroadcastCamStopMsg { val NAME = "UserBroadcastCamStopMsg" }
case class UserBroadcastCamStopMsg(header: BbbClientMsgHeader, body: UserBroadcastCamStopMsgBody) extends BbbCoreMsg

/** Whiteboard Messages */
object SendCursorPositionPubMsg { val NAME = "SendCursorPositionPubMsg"}
case class SendCursorPositionPubMsg(header: BbbClientMsgHeader, body: SendCursorPositionPubMsgBody) extends StandardMsg

object SendWhiteboardAnnotationPubMsg { val NAME = "SendWhiteboardAnnotationPubMsg"}
case class SendWhiteboardAnnotationPubMsg(header: BbbClientMsgHeader, body: SendWhiteboardAnnotationPubMsgBody) extends StandardMsg

object GetWhiteboardAnnotationsReqMsg { val NAME = "GetWhiteboardAnnotationsReqMsg"}
case class GetWhiteboardAnnotationsReqMsg(header: BbbClientMsgHeader, body: GetWhiteboardAnnotationsReqMsgBody) extends StandardMsg

object ClearWhiteboardPubMsg { val NAME = "ClearWhiteboardPubMsg"}
case class ClearWhiteboardPubMsg(header: BbbClientMsgHeader, body: ClearWhiteboardPubMsgBody) extends StandardMsg

object UndoWhiteboardPubMsg { val NAME = "UndoWhiteboardPubMsg"}
case class UndoWhiteboardPubMsg(header: BbbClientMsgHeader, body: UndoWhiteboardPubMsgBody) extends StandardMsg

object ModifyWhiteboardAccessPubMsg { val NAME = "ModifyWhiteboardAccessPubMsg"}
case class ModifyWhiteboardAccessPubMsg(header: BbbClientMsgHeader, body: ModifyWhiteboardAccessPubMsgBody) extends StandardMsg

object GetWhiteboardAccessReqMsg { val NAME = "GetWhiteboardAccessReqMsg"}
case class GetWhiteboardAccessReqMsg(header: BbbClientMsgHeader, body: GetWhiteboardAccessReqMsgBody) extends StandardMsg

object StartPollReqMsg { val NAME = "StartPollReqMsg"}
case class StartPollReqMsg(header: BbbClientMsgHeader, body: StartPollReqMsgBody) extends BbbCoreMsg

object StartCustomPollReqMsg { val NAME = "StartCustomPollReqMsg"}
case class StartCustomPollReqMsg(header: BbbClientMsgHeader, body: StartCustomPollReqMsgBody) extends BbbCoreMsg

object StopPollReqMsg { val NAME = "StopPollReqMsg"}
case class StopPollReqMsg(header: BbbClientMsgHeader, body: StopPollReqMsgBody) extends BbbCoreMsg

object ShowPollResultReqMsg { val NAME = "ShowPollResultReqMsg"}
case class ShowPollResultReqMsg(header: BbbClientMsgHeader, body: ShowPollResultReqMsgBody) extends BbbCoreMsg

object HidePollResultReqMsg { val NAME = "HidePollResultReqMsg"}
case class HidePollResultReqMsg(header: BbbClientMsgHeader, body: HidePollResultReqMsgBody) extends BbbCoreMsg

object GetCurrentPollReqMsg { val NAME = "GetCurrentPollReqMsg"}
case class GetCurrentPollReqMsg(header: BbbClientMsgHeader, body: GetCurrentPollReqMsgBody) extends BbbCoreMsg

object RespondToPollReqMsg { val NAME = "RespondToPollReqMsg"}
case class RespondToPollReqMsg(header: BbbClientMsgHeader, body: RespondToPollReqMsgBody) extends BbbCoreMsg

//
/** Event messages sent by Akka apps as result of receiving incoming messages ***/
//

object MeetingCreatedEvtMsg { val NAME = "MeetingCreatedEvtMsg"}
case class MeetingCreatedEvtMsg(header: BbbCoreBaseHeader,
                                body: MeetingCreatedEvtBody) extends BbbCoreMsg

object ValidateAuthTokenRespMsg { val NAME = "ValidateAuthTokenRespMsg" }
case class ValidateAuthTokenRespMsg(header: BbbClientMsgHeader,
                                    body: ValidateAuthTokenRespMsgBody) extends BbbCoreMsg





object UserBroadcastCamStartedEvtMsg { val NAME = "UserBroadcastCamStartedEvtMsg" }
case class UserBroadcastCamStartedEvtMsg(header: BbbClientMsgHeader, body: UserBroadcastCamStartedEvtMsgBody) extends BbbCoreMsg

object UserBroadcastCamStoppedEvtMsg { val NAME = "UserBroadcastCamStoppedEvtMsg" }
case class UserBroadcastCamStoppedEvtMsg(header: BbbClientMsgHeader, body: UserBroadcastCamStoppedEvtMsgBody) extends BbbCoreMsg


/** Whiteboard Messages */
object SendCursorPositionEvtMsg { val NAME = "SendCursorPositionEvtMsg" }
case class SendCursorPositionEvtMsg(header: BbbClientMsgHeader, body: SendCursorPositionEvtMsgBody) extends BbbCoreMsg

object SendWhiteboardAnnotationEvtMsg { val NAME = "SendWhiteboardAnnotationEvtMsg" }
case class SendWhiteboardAnnotationEvtMsg(header: BbbClientMsgHeader, body: SendWhiteboardAnnotationEvtMsgBody) extends BbbCoreMsg

object GetWhiteboardAnnotationsRespMsg { val NAME = "GetWhiteboardAnnotationsRespMsg" }
case class GetWhiteboardAnnotationsRespMsg(header: BbbClientMsgHeader, body: GetWhiteboardAnnotationsRespMsgBody) extends BbbCoreMsg

object ClearWhiteboardEvtMsg { val NAME = "ClearWhiteboardEvtMsg" }
case class ClearWhiteboardEvtMsg(header: BbbClientMsgHeader, body: ClearWhiteboardEvtMsgBody) extends BbbCoreMsg

object UndoWhiteboardEvtMsg { val NAME = "UndoWhiteboardEvtMsg" }
case class UndoWhiteboardEvtMsg(header: BbbClientMsgHeader, body: UndoWhiteboardEvtMsgBody) extends BbbCoreMsg

object ModifyWhiteboardAccessEvtMsg { val NAME = "ModifyWhiteboardAccessEvtMsg" }
case class ModifyWhiteboardAccessEvtMsg(header: BbbClientMsgHeader, body: ModifyWhiteboardAccessEvtMsgBody) extends BbbCoreMsg

object GetWhiteboardAccessRespMsg { val NAME = "GetWhiteboardAccessRespMsg" }
case class GetWhiteboardAccessRespMsg(header: BbbClientMsgHeader, body: GetWhiteboardAccessRespMsgBody) extends BbbCoreMsg

object PollStartedEvtMsg { val NAME = "PollStartedEvtMsg" }
case class PollStartedEvtMsg(header: BbbClientMsgHeader, body: PollStartedEvtMsgBody) extends BbbCoreMsg

object PollStoppedEvtMsg { val NAME = "PollStoppedEvtMsg" }
case class PollStoppedEvtMsg(header: BbbClientMsgHeader, body: PollStoppedEvtMsgBody) extends BbbCoreMsg

object PollShowResultEvtMsg { val NAME = "PollShowResultEvtMsg" }
case class PollShowResultEvtMsg(header: BbbClientMsgHeader, body: PollShowResultEvtMsgBody) extends BbbCoreMsg

object PollHideResultEvtMsg { val NAME = "PollHideResultEvtMsg" }
case class PollHideResultEvtMsg(header: BbbClientMsgHeader, body: PollHideResultEvtMsgBody) extends BbbCoreMsg

object GetCurrentPollRespMsg { val NAME = "GetCurrentPollRespMsg"}
case class GetCurrentPollRespMsg(header: BbbClientMsgHeader, body: GetCurrentPollRespMsgBody) extends BbbCoreMsg

object UserRespondedToPollEvtMsg { val NAME = "UserRespondedToPollEvtMsg"}
case class UserRespondedToPollEvtMsg(header: BbbClientMsgHeader, body: UserRespondedToPollEvtMsgBody) extends BbbCoreMsg

/** System Messages **/
case class AkkaAppsCheckAliveReqBody(timestamp: Long)
case class AkkaAppsCheckAliveReqMsg(header: BbbCoreHeader, body: AkkaAppsCheckAliveReqBody)
case class AkkaAppsCheckAliveReq(envelope: BbbCoreEnvelope, msg: AkkaAppsCheckAliveReqMsg) extends BbbCoreMsg

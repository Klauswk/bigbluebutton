package org.bigbluebutton.common2.messages


import org.bigbluebutton.common2.domain.DefaultProps
import org.bigbluebutton.common2.domain.AnnotationProps
import org.bigbluebutton.common2.domain._

object MessageBody {
  case class CreateMeetingReqMsgBody(props: DefaultProps)
  case class MeetingCreatedEvtBody(props: DefaultProps)
  case class ValidateAuthTokenReqMsgBody(userId: String, authToken: String)
  case class RegisterUserReqMsgBody(meetingId: String, intUserId: String, name: String, role: String,
                                    extUserId: String, authToken: String, avatarURL: String,
                                    guest: Boolean, authed: Boolean)
  case class ValidateAuthTokenRespMsgBody(userId: String, authToken: String, valid: Boolean)

  case class UserLeaveReqMsgBody(userId: String, sessionId: String)
  case class GetUsersReqMsgBody(requesterId: String)
  case class UserEmojiStatusChangeReqMsgBody(userId: String, emoji: String)
  case class EjectUserFromMeetingReqMsgBody(userId: String, requesterId: String)
  case class UserBroadcastCamStartMsgBody(stream: String)
  case class UserBroadcastCamStopMsgBody(stream: String)
  case class ChangeUserStatusReqMsgBody(userId: String, status: String, value: String)
  case class ChangeUserRoleReqMsgBody(userId: String, role: String)
  case class AssignPresenterReqMsgBody(userId: String, requesterId: String)
  case class SetRecordingReqMsgBody(recording: Boolean, requesterId: String)
  case class GetRecordingStatusReqMsgBody(requesterId: String)
  case class AllowUserToShareDesktopReqMsgBody(userId: String)
  case class StartPollReqMsgBody(requesterId: String, pollId: String, pollType: String)
  case class StartCustomPollReqMsgBody(requesterId: String, pollId: String, pollType: String, answers: Seq[String])
  case class StopPollReqMsgBody(requesterId: String)
  case class ShowPollResultReqMsgBody(requesterId: String, pollId: String)
  case class HidePollResultReqMsgBody(requesterId: String, pollId: String)
  case class GetCurrentPollReqMsgBody(requesterId: String)
  case class RespondToPollReqMsgBody(requesterId: String, pollId: String, questionId: Int, answerId: Int)

  // Whiteboard Message Bodies
  case class SendCursorPositionPubMsgBody(xPercent: Double, yPercent: Double)
  case class SendWhiteboardAnnotationPubMsgBody(annotation: AnnotationProps)
  case class GetWhiteboardAnnotationsReqMsgBody(whiteboardId: String)
  case class ClearWhiteboardPubMsgBody(whiteboardId: String)
  case class UndoWhiteboardPubMsgBody(whiteboardId: String)
  case class ModifyWhiteboardAccessPubMsgBody(multiUser: Boolean)
  case class GetWhiteboardAccessReqMsgBody(requesterId: String)

  //
  /** Event messages sent by Akka apps as result of receiving incoming messages ***/
  //

  ///////////////////////////////////////////
  // Out Message Bodies
  ///////////////////////////////////////////
  
  case class UserBroadcastCamStartedEvtMsgBody(userId: String, stream: String)
  case class UserBroadcastCamStoppedEvtMsgBody(userId: String, stream: String)

  
  // Whiteboard Message Bodies
  case class SendCursorPositionEvtMsgBody(xPercent: Double, yPercent: Double)
  case class SendWhiteboardAnnotationEvtMsgBody(annotation: AnnotationProps)
  case class GetWhiteboardAnnotationsRespMsgBody(whiteboardId: String, annotations: Array[AnnotationProps])
  case class ClearWhiteboardEvtMsgBody(whiteboardId: String, userId: String, fullClear: Boolean)
  case class UndoWhiteboardEvtMsgBody(whiteboardId: String, userId: String, annotationId: String)
  case class ModifyWhiteboardAccessEvtMsgBody(multiUser: Boolean)
  case class GetWhiteboardAccessRespMsgBody(multiUser: Boolean)

  case class PollStartedEvtMsgBody(userId: String, pollId: String, poll: SimplePollOutVO)
  case class PollStoppedEvtMsgBody(userId: String, pollId: String)
  case class PollShowResultEvtMsgBody(userId: String, pollId: String, poll: SimplePollResultOutVO)
  case class PollHideResultEvtMsgBody(userId: String, pollId: String)
  case class GetCurrentPollRespMsgBody(userId: String, hasPoll: Boolean, poll: Option[PollVO])
  case class UserRespondedToPollEvtMsgBody(presenterId: String, pollId: String, poll: SimplePollResultOutVO)

}

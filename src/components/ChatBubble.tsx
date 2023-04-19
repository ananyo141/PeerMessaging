import React from "react";

type Props = {
  sender: string;
  message: string;
  time: string;
  self: boolean;
};

const ChatBubble = (props: Props) => {
  return (
    <div className={props.self ? "chat chat-end" : "chat chat-start"}>
      <div className="chat-header">
        <time className="text-xs opacity-50">{props.time}</time>
      </div>
      <div className="chat-bubble">{props.message}</div>
      <div className="chat-footer opacity-50">{props.self ? "Sent" : "Received"}</div>
    </div>
  );
};

export default ChatBubble;

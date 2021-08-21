import { FC, ReactElement } from "react";
import { Box } from "@material-ui/core";
import { ChatCard } from "./ChatCard";
import { Message, Messages } from "../types/Interface";

export const ChatContainer: FC<Messages> = ({ messages }): ReactElement => {
  const messageCards: Array<ReactElement> | ReactElement =
    messages && messages.length > 0 ? (
      messages.map((message: Message, key: number) => {
        return (
          <ChatCard
            key={key}
            message={message.message}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        );
      })
    ) : (
      <div>There is no message</div>
    );
  return <Box>{messageCards}</Box>;
};

export default ChatContainer;

import { FC, ReactElement, KeyboardEvent, ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMeasage, messageSelector } from "./redux/store";
import { Message } from "./types/Interface";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import CustomForm from "./components/CustomForm";

import "./App.css";

const App: FC = (): ReactElement => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messages: Message[] = useSelector(messageSelector);
  const dispatch = useDispatch();

  const onTypingMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value || "";
    setNewMessage(value);
  };

  const onButtonSendMessage = (): void => {
    dispatch(
      sendMeasage({
        source: "user",
        message: newMessage,
        timestamp: new Date().toISOString(),
      })
    );
    setNewMessage("");
  };
  const onKeyEnterSendMessage = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.code === "Enter") {
      dispatch(
        sendMeasage({
          source: "user",
          message: newMessage,
          timestamp: new Date().toISOString(),
        })
      );
      setNewMessage("");
    }
  };

  return (
    <div className="App">
      <Header />
      <ChatContainer messages={messages} />
      <CustomForm
        message={newMessage}
        onButtonSendMessage={onButtonSendMessage}
        onKeyEnterSendMessage={onKeyEnterSendMessage}
        onTypingMessage={onTypingMessage}
      />
    </div>
  );
};

export default App;

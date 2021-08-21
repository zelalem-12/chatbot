import React, { FC, ReactElement, KeyboardEvent, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
import { Message } from "./types/Interface";
import { useSelector, useDispatch } from "react-redux";
import { sendMeasage, receiveMessage, messageSelector } from "./redux/store";
import { ChatContainer } from "./components/ChatContainer";

import "./App.css";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const useStayle = makeStyles((theme) => ({
  messageContainer: {
    height: "100%",
    width: "100%",
  },
  messagingForm: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "25%",
    top: "85%",
    width: "50%",
  },
  sendButton: {
    fontSize: "1.5rem",
    fontWeight: 600,
    width: "13%",
    borderRadius: "10px",
  },
  margin: {
    fontSize: "1.5rem",
    fontWeight: 600,
    width: "85%",
    borderRadius: "10px",
    marginRight: "2%",
  },
}));

export const App: FC = (): ReactElement => {
  const [newMessage, setNewMessage] = useState<string>("");
  const messages: Message[] = useSelector(messageSelector);
  const dispatch = useDispatch();

  const onSendMessage = () => {
    dispatch(
      sendMeasage({
        sender: "Bot",
        message: newMessage,
        timestamp: new Date().toISOString(),
      })
    );
    setNewMessage("");
  };

  const onKeyEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === "Enter") {
      dispatch(
        sendMeasage({
          sender: "User",
          message: newMessage,
          timestamp: new Date().toISOString(),
        })
      );
      setNewMessage("");
    }
  };
  const buttonStatus: Boolean = newMessage ? true : false;
  const classes = useStayle();
  return (
    <div className="container">
      <Box className={classes.messageContainer}>
        HTMLTextAreaElement
        {messages.length ? (
          <ChatContainer messages={messages} />
        ) : (
          <div>Start Chatting With Chat Box</div>
        )}
      </Box>
      <Box className={classes.messagingForm}>
        <CssTextField
          className={classes.margin}
          label="Message"
          variant="outlined"
          id="custom-css-outlined-input"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={onKeyEnterHandler}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.sendButton}
          onClick={onSendMessage}
          disabled={!buttonStatus}
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

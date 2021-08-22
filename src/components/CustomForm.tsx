import { FC, ReactElement } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MessageForm } from "../types/Interface";

const useStayle = makeStyles({
  root: {
    display: "flex",
    padding: "10px",
    borderTop: "var(--border)",
    background: "#fff",
    "& *": {
      padding: "10px",
      border: "none",
      borderRadius: "3px",
      fontSize: "1em",
    },
  },
  sgerInput: {
    flex: 1,
    background: "#fff",
  },
  sendButton: {
    marginLeft: "10px",
    background: "rgb(0, 196, 65)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.23s",
    "&:hover": {
      background: "rgb(42, 115, 63)",
    },
  },
});

const CustomForm: FC<MessageForm> = ({
  message,
  onButtonSendMessage,
  onKeyEnterSendMessage,
  onTypingMessage,
}): ReactElement => {
  const classes = useStayle();
  return (
    <Box className={classes.root}>
      <TextField
        className={classes.sgerInput}
        label="Enter your message..."
        variant="outlined"
        type="text"
        value={message}
        onChange={onTypingMessage}
        onKeyDown={onKeyEnterSendMessage}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.sendButton}
        onClick={onButtonSendMessage}
        disabled={message ? false : true}
      >
        Send
      </Button>
    </Box>
  );
};

export default CustomForm;

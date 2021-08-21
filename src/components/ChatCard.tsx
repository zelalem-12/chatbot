import { FC, ReactElement } from "react";
import { Avatar, Tooltip, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Message } from "../types/Interface";

export const ChatCard: FC<Message> = ({
  sender,
  message,
  timestamp,
}): ReactElement => {
  const useStyles = makeStyles({
    root: {
      margin: "0.5rem",
      color: "black",
      width: "100%",
      float: sender === "User" ? "right" : "left",
    },
    avatar: {
      float: sender === "User" ? "right" : "left",
      backgroundColor: sender === "User" ? "green" : "blue",
      verticalAlign: "middle",
    },
    messageBox: {
      width: "85%",
      height: "60px",
      borderRadius: "1.0rem",
      padding: "0.3rem",
      float: sender === "User" ? "right" : "left",
      margin: sender === "User" ? "0 15px 0 0" : "0 0 0 15px",
      backgroundColor: sender === "User" ? "#f2f2f2" : "#d3dbe8",
      display: "flex",
      justifyContent: sender === "User" ? "flex-end" : "flex-start",
      "& *": {
        margin: "0.5rem",
      },
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Tooltip arrow title={`${sender}`}>
        <Avatar className={classes.avatar}>
          {sender && sender[0].toUpperCase()}
        </Avatar>
      </Tooltip>
      <Box className={classes.messageBox}>
        <p>{message}</p>
        <p>
          {new Date(timestamp).getHours() +
            ":" +
            new Date(timestamp).getMinutes()}
        </p>
      </Box>
    </Box>
  );
};

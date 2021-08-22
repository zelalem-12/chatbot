import { FC, ReactElement } from "react";
import { Tooltip, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Message } from "../types/Interface";

export const ChatCard: FC<Message> = ({
  source,
  message,
  timestamp,
}): ReactElement => {
  const rootStyle: any = {};
  const bubbleStyle: any = {};
  let avatarUrl: string;
  if (source.toLowerCase() === "bot") {
    rootStyle.borderBottomLeftRadius = 0;
    avatarUrl = "url(https://image.flaticon.com/icons/svg/327/327779.svg)";
    bubbleStyle.borderBottomLeftRadius = 0;
  } else {
    rootStyle.borderBottomRightRadius = 0;
    rootStyle.flexDirection = "row-reverse";
    rootStyle.color = "#000";
    rootStyle.margin = "0 0 0 10px";
    avatarUrl = "url(https://image.flaticon.com/icons/svg/145/145867.svg)";

    bubbleStyle.borderBottomRightRadius = 0;
    bubbleStyle.background = "var(--right-msg-bg)";
    bubbleStyle.color = "#000";
  }

  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "flex-end",
      marginBottom: "15px",
      ...rootStyle,
      "&:last-of-type": {
        margin: 0,
      },
    },
    avatar: {
      width: "50px",
      height: "50px",
      marginRight: "10px",
      background: "#ddd",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "50%",
      margin: "0 0 0 10px",
    },
    msgBubble: {
      maxWidth: "450px",
      padding: "15px",
      borderRadius: "15px",
      boxShadow: "0px 3px 7px #888888",
      background: "var(--left-msg-bg)",
      ...bubbleStyle,
    },

    msgInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    source: {
      marginRight: "10px",
      fontWeight: "bold",
    },
    messagingTime: {
      fontSize: "0.85em",
    },
    message: {
      fontStyle: "italic",
    },
  });
  const classes = useStyles();
  const messggingTime = new Date(timestamp);
  const messageSource = source.charAt(0).toUpperCase() + source.slice(1);
  return (
    <Box className={classes.root}>
      <Tooltip arrow title={messageSource} placement="top">
        <Box
          className={classes.avatar}
          style={{
            backgroundImage: avatarUrl,
          }}
        />
      </Tooltip>

      <Box className={classes.msgBubble}>
        <Box className={classes.msgInfo}>
          <Box className={classes.source}>{messageSource}</Box>
          <Box className={classes.messagingTime}>
            {messggingTime.getHours() + ":" + messggingTime.getMinutes()}
          </Box>
        </Box>
        <Box className={classes.message}>{message}</Box>
      </Box>
    </Box>
  );
};

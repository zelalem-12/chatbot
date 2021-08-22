import React, { FC, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    background: "#fff",
    borderBottom: "var(--border)",
    color: "#000",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: 500,
  },
}));

const Header: FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="fixed">
      <Box className={classes.title}>Chatbot</Box>
    </AppBar>
  );
};

export default Header;

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = (props) => {
  const { isLoading } = props;

  return (
    <div>
      <Backdrop
        open={isLoading}
        style={{
          zIndex: 999,
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;

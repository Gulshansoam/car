import { TextField } from "@mui/material";
import React from "react";

const RefrenceId = ({ setRefrenceId, refrenceId }) => {
  return (
    <div className="state-area">
      <TextField
        label="Refrence Id"
        value={refrenceId}
        variant="outlined"
        onChange={(e) => {
          setRefrenceId(e.target.value);
        }}
      />
    </div>
  );
};

export default RefrenceId;

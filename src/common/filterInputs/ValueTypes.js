import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";

const ValueTypes = (props) => {
  const { valueType, setValueType } = props;

  const handleChange = (event, value) => {
    value !== undefined && value !== null
      ? setValueType(value)
      : setValueType("");
  };

  const ValueTypeList = ["Contract Value", "Tender Value"];
  return (
    <div className="state-area">
      <FormControl fullWidth>
      <Autocomplete
        freeSolo
        autoSelect={false}
        inputValue={valueType}
        disablePortal
        id="demo-simple-select"
        onChange={handleChange}
        options={ValueTypeList}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Value type" />}
      />
      </FormControl>
    </div>
  );
};

export default ValueTypes;

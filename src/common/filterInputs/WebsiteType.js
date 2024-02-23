import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";

const WebSiteType = (props) => {
  const { websiteType, setWebsiteType } = props;

  const handleChange = (event, value) => {
    value !== undefined && value !== null
      ? setWebsiteType(value)
      : setWebsiteType("");
    // setWebsiteType(value || "");
  };


  const WebSiteTypeList = ["All", "GeM", "Non-GeM"];
  return (
    <div className="state-area">
      <FormControl fullWidth>
        <Autocomplete
          freeSolo
          autoSelect={false}
          value={websiteType}
          //   defaultValue={websiteType[0]}
          disablePortal
          id="demo-simple-select"
          onChange={handleChange}
          options={WebSiteTypeList}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Website" />}
        />
      </FormControl>
    </div>
  );
};

export default WebSiteType;

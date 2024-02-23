import { TextField } from "@mui/material";
import React from "react";

const SearchBar = (props) => {
  const { wordSearch, setWordSearch, fromPage } = props;
  return (
    <div className={fromPage !== "comparePage" ? "state-area" : ""}>
      <TextField
        label="Word Search"
        value={wordSearch}
        variant="outlined"
        onChange={(e) => {
          setWordSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;

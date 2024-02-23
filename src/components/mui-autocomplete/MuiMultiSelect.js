import { Autocomplete, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";

const MuiMultiSelect = (props) => {
  const {
    name,
    options,
    selectedValue,
    setSelectedValue,
    setText,
    setIsFilter = () => {},
  } = props;
  const [open, setOpen] = useState(false);

  //   const handleChange = (event) => {
  //     if (name === "Department") {
  //       setText(event.target.value);
  //       event.target.value.length >= 3 && setOpen(true);
  //     }
  //   };

  const handleFilterSelect = (e, value) => {
    setSelectedValue(value.map((res) => ({ ...res, type: name })));
    value !== null && value.length > 0
      ? setIsFilter(true)
      : setIsFilter((prev) => prev);
  };

  const handleFocus = (e, value) => {
    setOpen(true);
  };


  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple
        value={selectedValue}
        disablePortal
        id="tags-outlined"
        options={
          options !== undefined && options.length > 0
            ? options.filter((item) => {
                return !selectedValue
                  .map((res) => res.title.toLowerCase())
                  .includes(item.title.toLowerCase());
              })
            : []
        }
        getOptionLabel={(option) => {
          return option?.title;
        }}
        onChange={handleFilterSelect}
        onFocus={handleFocus}
        onKeyDown={handleFocus}
        renderInput={(params) => (
          <TextField
            {...params}
            label={name}
            // placeholder={name}
            // onChange={handleChange}
          />
        )}
      />
    </FormControl>
  );
};

export default MuiMultiSelect;

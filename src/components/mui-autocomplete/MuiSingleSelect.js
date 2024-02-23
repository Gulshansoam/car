import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const MuiSinglSelect = (props) => {
  const {
    // setIsFilter = () => {},
    // setQueryObject,
    // fromAdvanceSearch = false,
    className = "",
    selectedValue = null,
    setSelectedValue = () => {},
    setText = "",
    name = "",
    options = [],
  } = props;
  const [open, setOpen] = useState(false);

  const handleText = (e) => {
    if (name !== "Ownership") {
      setText(e.target.value);
      e.target.value.length >= 3 ? setOpen(true) : setOpen(false);
      return;
    }
    setOpen(true);
  };

  const handleFocus = (e) => {
    // if (name === "Ownership") {
    //   return setOpen(true);
    // }
    setOpen(false);
  };

  const handleFilterSelect = (e, value) => {
    setOpen(false);
    value !== null
      ? setSelectedValue({ ...value, type: name })
      : setSelectedValue(null);
  };

  const handleBlur = () => {
    // setOptionOpen(false);
    if (fromAdvanceSearch) {
      selectedValue !== null
        ? setQueryObject((prev) => ({
            ...prev,
            [name.toLocaleLowerCase()]: selectedValue.title
              .toLowerCase()
              .split(" ")
              .join("-"),
          }))
        : setQueryObject((prev) => {
            delete prev?.[name.toLocaleLowerCase()];
            return prev;
          });
    }
    selectedValue !== null ? setIsFilter(true) : setIsFilter((prev) => prev);
  };

  return (
    <Autocomplete
      fullWidth
      className={className}
      open={open}
      openOnFocus={false}
      disablePortal
      value={selectedValue}
      // onFocus={handleFocus}
      // onBlur={handleBlur}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      id="combo-box-demo"
      onChange={handleFilterSelect}
      options={options}
      getOptionLabel={(option) => option?.title}
      placeholder={name}
      renderInput={(params) => (
        <TextField
          onFocus={handleFocus}
          onChange={handleText}
          {...params}
          label={name}
        />
      )}
    />
  );
};

export default MuiSinglSelect;

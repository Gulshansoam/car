import React, { useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import { useState } from "react";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const StateSingleSelect = ({ stateTag, setStateTag, fromPage }) => {
  const [filterState, setFilterState] = useState([]);

  useEffect(() => {
    getSubIndustry();
  }, []);

  const getSubIndustry = async () => {
    const res = await tenderResultFilterService.getState({
      id: 0,
      parentids: "",
      pageNo: 0,
      noofrecords: 0,
      name: "",
    });

    res.Success && res.TotalRecord > 0
      ? setFilterState(
          res.Data !== undefined &&
            res.Data.sort(function (a, b) {
              var nameA = a.state_name.toUpperCase();
              var nameB = b.state_name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
        )
      : setFilterState([]);
  };

  const filterOptions = (options, state) => {
    return options.filter((res) =>
      res?.state_name?.toLowerCase().startsWith(state.inputValue.toLowerCase())
    );
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    value && value !== null
      ? setStateTag({ ...value, title: value.state_name, type: "state" })
      : setStateTag(null);
  };

  return (
    <div className={fromPage !== "comparision" ? "state-area" : ""}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          options={
            filterState !== undefined && filterState.length > 0
              ? filterState
              : []
          }
          id="demo-simple-select"
          value={stateTag}
          onChange={handleChange}
          // filterOptions={filterOptions}
          getOptionLabel={(option) => option.state_name}
          renderInput={(params) => (
            <TextField {...params} label="Select State" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default StateSingleSelect;

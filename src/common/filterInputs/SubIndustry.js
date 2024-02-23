import React, { useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import { useState } from "react";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const SubIndustry = ({ subIndustryTag, setSubIndustryTag, fromPage }) => {
  const [subIndustry, setSubIndustry] = useState([]);

  useEffect(() => {
    getSubIndustry();
  }, []);

  const getSubIndustry = async () => {
    const res = await tenderResultFilterService.getSubIndustrySevice();

    res.Success && res.TotalRecord > 0
      ? setSubIndustry(
          res.Data.sort(function (a, b) {
            var nameA = a.sub_industry_name.toUpperCase();
            var nameB = b.sub_industry_name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        )
      : setSubIndustry([]);
  };

  const filterOptions = (options, state) => {
    return options.filter((res) =>
      res?.sub_industry_name
        ?.toLowerCase()
        .startsWith(state.inputValue.toLowerCase())
    );
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setSubIndustryTag(value);
  };

  return (
    <div className={fromPage !== "comparePage" ? "state-area" : ""}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          options={subIndustry.length > 0 ? subIndustry : []}
          id="demo-simple-select"
          value={subIndustryTag}
          onChange={handleChange}
          // filterOptions={filterOptions}
          getOptionLabel={(option) => option.sub_industry_name}
          renderInput={(params) => (
            <TextField {...params} label="SubIndustry" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default SubIndustry;

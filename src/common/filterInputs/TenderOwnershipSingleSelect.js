import React, { useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import { useState } from "react";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const TenderOwnershipSingleSelect = ({
  tenderOwnershipTag,
  setTenderOwnershipTag,
  fromPage,
}) => {
  const [tenderOwnershipList, setTenderOwnershipList] = useState([]);

  useEffect(() => {
    getTenderOwnership();
  }, []);

  const getTenderOwnership = async () => {
    const res = await tenderResultFilterService.getTenderingOwnership({
      id: 0,
      parentids: "",
      pageNo: 0,
      noofrecords: 0,
      name: "",
    });

    res.Success && res.TotalRecord > 0
      ? setTenderOwnershipList(
          res.Data.sort(function (a, b) {
            var nameA = a.organization_type_name.toUpperCase();
            var nameB = b.organization_type_name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        )
      : setTenderOwnershipList([]);
  };

  const filterOptions = (options, state) => {
    return options.filter((res) =>
      res?.organization_type_name
        ?.toLowerCase()
        .startsWith(state.inputValue.toLowerCase())
    );
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setTenderOwnershipTag({
      ...value,
      title: value?.organization_type_name,
      type: "Ownership",
    });
  };

  return (
    <div className={fromPage !== "comparision" ? "state-area" : ""}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          options={
            tenderOwnershipList !== undefined && tenderOwnershipList?.length > 0
              ? tenderOwnershipList
              : []
          }
          id="demo-simple-select"
          value={tenderOwnershipTag}
          onChange={handleChange}
          // filterOptions={filterOptions}
          getOptionLabel={(option) =>
            option?.organization_type_name ? option?.organization_type_name : ""
          }
          renderInput={(params) => (
            <TextField {...params} label="Tendering Ownership" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default TenderOwnershipSingleSelect;

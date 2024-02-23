import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import { useState } from "react";

const TenderStage = ({ tenderStageTag, setTenderStageTag }) => {
  const [tenderStage, setTenderStage] = useState([]);

  useEffect(() => {
    getTenderStage();
  }, []);

  const getTenderStage = async () => {
    const res = await tenderResultFilterService.getTenderStage();
    if (res.Success) {
      setTenderStage(res.Data);
    } else {
      setTenderStage([]);
    }
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setTenderStageTag(value);
  };

  return (
    <div className="state-area">
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          options={tenderStage.length > 0 ? tenderStage : []}
          id="demo-simple-select"
          value={tenderStageTag}
          onChange={handleChange}
          getOptionLabel={(option) => option.stage}
          renderInput={(params) => (
            <TextField {...params} label="Tender Stage" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default TenderStage;

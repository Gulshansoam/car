import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const ResultValue = (props) => {
  const {
    tenderValueOperator,
    setTenderValueOperator,
    fromValue,
    setFromValue,
    toValue,
    setToValue,
    valueType,
  } = props;
  const [isShow, setIsShow] = useState(false);

  const Operator = [
    // { id: 1, label: "=" },
    { id: 2, label: "Greater than" },
    { id: 3, label: "Less than" },
    { id: 4, label: "Between" },
  ];

  const handleValueOperatorChange = (event) => {
    event.target.value === 4 ? setIsShow(true) : setIsShow(false);
    setTenderValueOperator(event.target.value);
  };
  const handleChangeFromValue = (e) => {
    parseInt(e.target.value) !== NaN
      ? setFromValue(parseInt(e.target.value))
      : setFromValue(0);
  };

  const handleChangeToValue = (e) => {
    parseInt(e.target.value) !== NaN
      ? tenderValueOperator === 4
        ? setToValue(parseInt(e.target.value))
        : setToValue(0)
      : setToValue(0);
  };

  return (
    <div className={"state-area tender-value"}>
      <div className="between-area">
        <FormControl fullWidth>
          {valueType.length > 0 ? (
            <InputLabel id="demo-simple-select-label">
              {valueType === "Tender Value" ? "Tender Value" : "Contract Value"}
            </InputLabel>
          ) : (
            <InputLabel id="demo-simple-select-label">
              {"Value Type"}
            </InputLabel>
          )}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tenderValueOperator}
            label={`${
              valueType === "Tender Value" ? "Tender Value" : "Contract Value"
            }`}
            onChange={handleValueOperatorChange}
            disabled={valueType.length > 0 ? false : true}
          >
            {Operator.map((res) => {
              return (
                <MenuItem value={res.id} key={res.id}>
                  {valueType.length > 0 ? res.label : "Select value type"}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="between-area">
        <TextField
          id="outlined-basic"
          label="From"
          variant="outlined"
          type="number"
          value={fromValue}
          onChange={handleChangeFromValue}
          disabled={valueType.length > 0 ? false : true}
        />
      </div>

      <>
        <div className="between-area">
          <TextField
            id="outlined-basic"
            label="To"
            variant="outlined"
            type="number"
            value={tenderValueOperator === 4 ? toValue : 0}
            onChange={handleChangeToValue}
            disabled={tenderValueOperator === 4 ? false : true}
          />
        </div>
      </>
    </div>
  );
};

export default ResultValue;

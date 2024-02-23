import React from "react";
import { DatePicker, Form } from "antd";
import { convertDateFormat } from "../../_helpers/date-format";

const RangePickerFilter = (props) => {
  const { setFromDate, setToDate } = props;
  const { RangePicker } = DatePicker;

  const handleSelectedDate = (e) => {
    if (e === null) {
      setFromDate(null);
      setToDate(null);
    } else {
      let startDate = convertDateFormat(e[0].$d);
      let endDate = convertDateFormat(e[1].$d);
      setFromDate(startDate);
      setToDate(endDate);
    }
  };

  return (
    <>
      <RangePicker
        placement="bottomRight"
        style={{ width: "100%" }}
        dropdownClassName="rangepicker-poparea"
        // ranges={{
        //   Yesterday: [
        //     moment().subtract(1, "days"),
        //     moment().subtract(1, "days"),
        //   ],
        //   "Last 7 Days": [moment().subtract(6, "d"), moment()],
        //   "Last 30 Days": [moment().subtract(30, "d"), moment()],
        //   "This Month": [moment().startOf("month"), moment().endOf("month")],
        //   "Last month": [
        //     moment().subtract(1, "months").startOf("month"),
        //     moment().subtract(1, "months").endOf("month"),
        //   ],
        // }}
        onChange={(e) => handleSelectedDate(e)}
        format={"YYYY/MM/DD"}
      />
    </>
  );
};

export default RangePickerFilter;

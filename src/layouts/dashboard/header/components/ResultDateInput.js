import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { useContext } from "react";
import { selectedDateRange } from "../context-api/Context";
import dayjs from "dayjs";
import { converterDefaultValue } from "./DateConvertor";
import {
  fromDate,
  fromDefaulDate,
  toDate,
  toDefaultDate,
} from "../../../../components/date-input/FromDateToDate";
import { constantCase } from "change-case";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedListing } from "../../../../redux/slice";
import moment from "moment";

const ResultDateInput = ({ fromDashboard }) => {
  const { RangePicker } = DatePicker;
  const dashboardListing = useSelector(
    (state) => state.listing_model.selectedListing
  );
  const dispatch = useDispatch();
  const [FromDate, setFromDate] = useState(fromDate());
  const [ToDate, setToDate] = useState(toDate());
  const selectedDateData = useContext(selectedDateRange);
  const [clear, setClear] = useState(false);
  const [isFromDashboard, setIsFromDashboard] = useState(fromDashboard);
  const [popupOpen, setPopUpOpen] = useState(true);
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    // if (firstRender === true) {
    setFromDate(fromDate());
    setToDate(toDate());
    selectedDateData.setSelectedFromDate(fromDate());
    selectedDateData.setSelectedToDate(toDate());
    setIsFromDashboard(fromDashboard);
    // }
    // else {
    //   localStorage.setItem("from_date", fromDefaulDate());
    //   localStorage.setItem("to_date", toDefaultDate())
    //   setFromDate(fromDefaulDate());
    //   setToDate(toDefaultDate());
    //   setFirstRender(true)
    //   setIsFromDashboard(fromDashboard);
    // }
  }, [window.location.href]);

  const handleSelectedDate = (e) => {
    if (e !== null) {
      if (e.length > 1) {
        if (fromDashboard) {
          const abc = converterDefaultValue(e[0].$d.toString().split(" "));
          const xyz = converterDefaultValue(e[1].$d.toString().split(" "));
          localStorage.setItem("from_date", abc);
          localStorage.setItem("to_date", xyz);
        }
        setFromDate(converterDefaultValue(e[0].$d.toString().split(" ")));
        setToDate(converterDefaultValue(e[1].$d.toString().split(" ")));
        // selectedDateData.setSelectedFromDate(converterDefaultValue(e[0].$d.toString().split(" ")));
        // selectedDateData.setSelectedToDate(converterDefaultValue(e[1].$d.toString().split(" ")));
        // selectedDateData.setIsDateSelected(true);
      }
    } else {
      if (fromDashboard) {
        localStorage.setItem("from_date", fromDefaulDate());
        localStorage.setItem("to_date", toDefaultDate());
      }
      setFromDate(fromDefaulDate());
      setToDate(toDefaultDate());
      // selectedDateData.setSelectedFromDate(fromDate());
      // selectedDateData.setSelectedToDate(toDate());
      // selectedDateData.setIsDateSelected(true);
    }
  };
  // useEffect(() => {

  //   setFromDate(fromDate());
  //   setToDate(toDate());

  // }, [])

  useEffect(() => {
    if (FromDate !== null && ToDate !== null) {
      if (!popupOpen) {
        selectedDateData.setIsDateSelected(true);
        selectedDateData.setSelectedFromDate(FromDate);
        selectedDateData.setSelectedToDate(ToDate);
      }
    } else {
      selectedDateData.setIsDateSelected(true);
      selectedDateData.setSelectedFromDate(fromDate());
      selectedDateData.setSelectedToDate(toDate());
    }
  }, [popupOpen]);

  const focousOnDate = (e) => {
    setIsFromDashboard(false);
    setClear(true);
  };
  const handleOpenPopup = (e) => {
    setPopUpOpen(e);
    setClear(e);
  };
  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf("month");
  };
  return (
    <>
      <RangePicker
        placement="bottomRight"
        style={{ width: "100%" }}
        dropdownClassName="rangepicker-poparea"
        onChange={(e) => handleSelectedDate(e)}
        format={"YYYY/MM/DD"}
        // value={
        //   [dayjs(selectedDateData.selectedFromDate, "YYYY/MM/DD"), dayjs(selectedDateData.selectedToDate, "YYYY/MM/DD")]
        // }
        value={
          FromDate !== null && ToDate !== null
            ? [dayjs(FromDate, "YYYY/MM/DD"), dayjs(ToDate, "YYYY/MM/DD")]
            : isFromDashboard
              ? [
                dayjs(fromDefaulDate(), "YYYY/MM/DD"),
                dayjs(toDefaultDate(), "YYYY/MM/DD"),
              ]
              : [FromDate, ToDate]
        }
        allowClear={clear}
        onFocus={focousOnDate}
        onOpenChange={handleOpenPopup}
        disabledDate={disabledDate}
      />
    </>
  );
};

export default ResultDateInput;

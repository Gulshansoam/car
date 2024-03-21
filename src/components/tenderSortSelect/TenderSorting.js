import React, { useState } from "react";
import ATOZ from "../../assets/images/atoz.png";
import ZTOA from "../../assets/images/ztoa.png";
import { FormControl } from "@mui/material";
import { Select } from "antd";

const TenderSorting = (props) => {
  const { setDataFound, setTenderForm, setIsFilter, setPage } = props;

  const option = [
    {
      value: "1",
      name: "Estimated Value",

      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Estimated Value
          <img src={ATOZ} />
        </p>
      ),
    },
    {
      value: "2",
      name: "Estimated Value",

      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Estimated Value
          <img src={ZTOA} />
        </p>
      ),
    },

    {
      value: "3",
      name: "Contract Value",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Contract Value
          <img src={ATOZ} />
        </p>
      ),
    },
    {
      value: "4",
      name: "Contract Value",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Contract Value
          <img src={ZTOA} />
        </p>
      ),
    },
    {
      value: "5",
      name: "Update Date",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Update Date
          <img src={ATOZ} />
        </p>
      ),
    },
    {
      value: "6",
      name: "Update Date",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Update Date
          <img src={ZTOA} />
        </p>
      ),
    },
    {
      value: "7",
      name: "Submission Date",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Submission Date
          <img src={ATOZ} />
        </p>
      ),
    },
    {
      value: "8",
      name: "Submission Date",
      label: (
        <p className="sortingoption" style={{ display: "flex", margin: "0" }}>
          Submission Date
          <img src={ZTOA} />
        </p>
      ),
    },
  ];

  const [sortingOption, setSortingOption] = useState([
    option[5],
    ...option.filter(
      (res) => res.value !== "5" && parseInt(res.value) % 2 !== 0
    ),
  ]);

  const handleSort = (e, value) => {
    setPage(1);
    // setTenderForm((prev) => ({ ...prev, search_by_split_word: false }));
    setDataFound(false);
    if (e == 1) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 1,
        sort_type: 1,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        option[1],
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 2) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 1,
        sort_type: 2,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 3) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 2,
        sort_type: 1,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        option[3],
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 4) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 2,
        sort_type: 2,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 5) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 3,
        sort_type: 1,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        option[5],
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 6) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 3,
        sort_type: 2,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 7) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 4,
        sort_type: 1,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        option[7],
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    } else if (e == 8) {
      setTenderForm((prev) => ({
        ...prev,
        sort_by: 4,
        sort_type: 2,
        search_by_split_word: false,
      }));
      setIsFilter(true);
      setSortingOption([
        ...option.filter((res) => res.value !== e && res.value % 2 !== 0),
      ]);
    }
  };

  return (
    <div className="sort-by-area">
      <FormControl className="sort-by-full-area" fullWidth>
        <div className="sort-by-text-area">Sort By :</div>
        <Select
          placeholder={
            <p
              className="sortingoption"
              style={{ display: "flex", margin: "0" }}
            >
              Update Date
              <img src={ZTOA} />
            </p>
          }
          options={sortingOption}
          onSelect={handleSort}
          className="sort-by-select-area"
        ></Select>
      </FormControl>
    </div>
  );
};

export default TenderSorting;

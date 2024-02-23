import React, { useEffect, useState } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import MuiMultiSelect from "../../components/mui-autocomplete/MuiMultiSelect";

const StateFilter = (props) => {
  const { stateTag, setStateTag, tenderForm, fromPage } = props;
  const [filterState, setFilterState] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getState();
  }, []);

  const getState = async () => {
    const res = await tenderResultFilterService.getState({
      id: 0,
      parentids: "",
      pageNo: 0,
      noofrecords: 0,
      name: "",
    });
    if (res.Success && res.TotalRecord > 0) {
      setIsError(false);
      tenderForm
        ? setStateTag(
            res.Data.filter(
              (e) => e.state_id.toString() === tenderForm.state_ids
            )
          )
        : setStateTag([]);
      setFilterState(
        res.Data.map((res) => ({ ...res, title: res.state_name })).sort(
          (a, b) => {
            if (a.state_name < b.state_name) {
              return -1;
            }
            if (a.state_name > b.state_name) {
              return 1;
            }
            return 0;
          }
        )
      );
    } else {
      setIsError(true);
      setFilterState([]);
    }
  };

  return (
    <div className={fromPage !== "comparision" ? "state-area" : ""}>
      <MuiMultiSelect
        name={"State"}
        options={filterState}
        selectedValue={stateTag}
        setSelectedValue={setStateTag}
      />
    </div>
  );
};

export default StateFilter;

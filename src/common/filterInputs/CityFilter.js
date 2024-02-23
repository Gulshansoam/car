import React, { useState, useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import MuiMultiSelect from "../../components/mui-autocomplete/MuiMultiSelect";

const CityFilter = (props) => {
  const { cityTag, setCityTag, stateTag } = props;
  const [cityData, setCityData] = useState([]);
  const [isError, setIsError] = useState(false);

  const getFilterCity = async () => {
    const res = await tenderResultFilterService.getCity({
      id: 0,
      parentids: stateTag.map((res) => res.state_id).join(","),
      pageNo: 0,
      noofrecords: 0,
      name: "",
    });

    if (res.Success && res.TotalRecord > 0) {
      setIsError(false);
      setCityData(
        res.Data.map((res) => ({ ...res, title: res.city_name })).sort(
          (a, b) => {
            if (a.city_name < b.city_name) {
              return -1;
            }
            if (a.city_name > b.city_name) {
              return 1;
            }
            return 0;
          }
        )
      );
    } else {
      setIsError(true);
      setCityData([]);
    }
  };

  useEffect(() => {
    stateTag !== undefined && stateTag.length > 0
      ? getFilterCity()
      : setCityTag([]);
  }, [stateTag]);

  return (
    <>
      {stateTag !== undefined && stateTag.length > 0 ? (
        <div className="state-area">
          <MuiMultiSelect
            name={"City"}
            options={cityData}
            selectedValue={cityTag}
            setSelectedValue={setCityTag}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CityFilter;

import React, { useState, useEffect } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import MuiMultiSelect from "../../components/mui-autocomplete/MuiMultiSelect";

const TenderOwnership = (props) => {
  const { tenderOwnershipTag, setTenderOwnershipTag } = props;

  const [tenderOwnership, setTenderOwnership] = useState([]);
  const [isError, setIsError] = useState(false);

  const getTenderingOwnership = async () => {
    const res = await tenderResultFilterService.getTenderingOwnership();
    if (res.Success) {
      setIsError(false);
      setTenderOwnership(
        res.Data.map((res) => ({
          ...res,
          title: res.organization_type_name,
        })).sort((a, b) => {
          if (a.organization_type_name < b.organization_type_name) {
            return -1;
          }
          if (a.organization_type_name > b.organization_type_name) {
            return 1;
          }
          return 0;
        })
      );
    } else {
      setIsError(true);
      setTenderOwnership([]);
    }
  };

  useEffect(() => {
    getTenderingOwnership();
  }, []);

  return (
    <div className="state-area">
      <MuiMultiSelect
        name={"Tendering Ownership"}
        options={tenderOwnership}
        selectedValue={tenderOwnershipTag}
        setSelectedValue={setTenderOwnershipTag}
      />
    </div>
  );
};

export default TenderOwnership;

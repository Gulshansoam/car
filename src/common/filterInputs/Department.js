import React, { useEffect, useState } from "react";
import { tenderResultFilterService } from "../../_services/tenderResultFilterServices";
import MuiSinglSelect from "../../components/mui-autocomplete/MuiSingleSelect";

const Department = (props) => {
  const { tenderOwnershipTag, departmentTag, setDepartmentTag, fromMisPage } =
    props;
  const [text, setText] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const departmentApi = async () => {
    try {
      const res = await tenderResultFilterService.getDepartment({
        id: 0,
        parentids: fromMisPage
          ? tenderOwnershipTag !== undefined &&
            tenderOwnershipTag !== null &&
            Object.keys(tenderOwnershipTag).length > 0
            ? tenderOwnershipTag.organization_type_id
            : ""
          : tenderOwnershipTag.map((res) => res.organization_type_id).join(","),
        pageNo: 1,
        noOfRecords: 10,
        name: text,
      });

      if (res.Success && res.TotalRecord > 0) {
        setDepartmentList(
          res.Data.map((object) => ({
            ...object,
            title: object.organization_name,
          })).sort((a, b) => {
            if (a.organization_name < b.organization_name) {
              return -1;
            }
            if (a.organization_name > b.organization_name) {
              return 1;
            }
            return 0;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    text.length >= 3 && departmentApi();
  }, [text]);

  return (
    <div className="state-area">
      <MuiSinglSelect
        setText={setText}
        name={"Department"}
        options={departmentList}
        selectedValue={departmentTag}
        setSelectedValue={setDepartmentTag}
      />
    </div>
  );
};

export default Department;

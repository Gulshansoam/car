import React, { useEffect, useState } from "react";
import { compareCompetitors } from "../../_services/compareCompetitorsServices";
import MuiSinglSelect from "../../components/mui-autocomplete/MuiSingleSelect";

const CompanyName = (props) => {
  const { companyName, setCompanyName, titleLabel } = props;
  const [text, setText] = useState("");
  const [participantList, setParticipantList] = useState([]);

  const getCompanyName = async () => {
    try {
      const res = await compareCompetitors.getCompanyNameForComparison({
        company_name: text,
      });

      res.Success && res.TotalRecord > 0
        ? setParticipantList(
            res.Data.map((object) => ({
              ...object,
              title: object.bidder_name,
            })).sort((a, b) => {
              if (a.bidder_name < b.bidder_name) {
                return -1;
              }
              if (a.bidder_name > b.bidder_name) {
                return 1;
              }
              return 0;
            })
          )
        : setParticipantList([]);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    text.length >= 3 && getCompanyName();
  }, [text]);

  return (
    <div className={titleLabel !=="Search Company" ? "state-area" : ""}>
      <MuiSinglSelect
        setText={setText}
        name={titleLabel}
        options={participantList}
        selectedValue={companyName}
        setSelectedValue={setCompanyName}
      />
    </div>
  );
};

export default CompanyName;

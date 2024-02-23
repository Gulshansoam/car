import { Chip } from "@mui/material";
import React, { useEffect } from "react";

const Tags = (props) => {
  const {
    allTags,
    setAllTags,
    setTenderForm,
    setWordSearch,
    setStateTag,
    stateTag,
    cityTag,
    setCityTag,
    tenderOwnershipTag,
    setTenderOwnershipTag,
    departmentTag,
    setDepartmentTag,
    setValueType,
    setTenderValueOperator,
    setFromValue,
    setToValue,
    setParticipantName,
    setWinnerBidderName,
    setTenderStageTag,
    setFromDate,
    setToDate,
    setKeyWordTags,
    setIsFilter,
    setDataFound,
    setIsSplitWord,
    setRefrenceId,
    setPage,
    setSubIndustryTag,
    setIsSearchBy,
    setWebsiteType,
  } = props;

  const handleDelete = (e, res) => {
    setIsSplitWord(false);
    setIsSearchBy(false);
    setDataFound(false);
    if (res.type === "State" && stateTag.length < 2) {
      setAllTags(
        allTags.map((prev) => {
          if (
            prev?.type === "City" ||
            JSON.stringify(prev) === JSON.stringify(res)
          ) {
            return null;
          } else {
            return prev;
          }
        })
      );
    } else {
      setAllTags(
        allTags.filter((prev) => JSON.stringify(prev) !== JSON.stringify(res))
      );
    }
    setTenderForm((prev) => ({
      ...prev,
      search_by_split_word: false,
      search_by: 1,
    }));
    setPage(1);
    switch (res.type) {
      case "Word Search":
        setWordSearch("");
        setTenderForm((prev) => ({ ...prev, search_text: "", result_id: 0 }));
        setIsFilter(true);

        break;
      case "State":
        setStateTag(stateTag.filter((e) => res.state_id !== e.state_id));
        stateTag.length < 2 && setCityTag([]);

        setTenderForm((prev) => ({
          ...prev,
          state_ids: stateTag
            .filter((e) => res.state_id !== e.state_id)
            .map((data) => data.state_id)
            .join(","),
          city_ids: stateTag.length < 2 ? "" : prev.city_ids,
        }));
        setIsFilter(true);

        break;
      case "City":
        setCityTag(cityTag.filter((e) => res.city_id !== e.city_id));
        setTenderForm((prev) => ({
          ...prev,
          city_ids: cityTag
            .filter((e) => res.city_id !== e.city_id)
            .map((data) => data.city_id)
            .join(","),
        }));
        setIsFilter(true);

        break;
      case "Tendering Ownership":
        setTenderOwnershipTag(
          tenderOwnershipTag.filter(
            (e) => res.organization_type_id !== e.organization_type_id
          )
        );
        setTenderForm((prev) => ({
          ...prev,
          organization_type_name: tenderOwnershipTag
            .filter((e) => res.organization_type_id !== e.organization_type_id)
            .map((data) => data.organization_type_id)
            .join(","),
        }));
        setIsFilter(true);

        break;
      case "Department":
        setDepartmentTag(null);
        setTenderForm((prev) => ({ ...prev, organization_id: 0 }));
        setIsFilter(true);

        break;
      case "Value Type":
        setValueType("");
        setFromValue(0);
        setToValue(0);
        setTenderValueOperator(2);
        setTenderForm((prev) => ({
          ...prev,
          tender_value_operator: 0,
          contract_value_operator: 0,
          contract_value_from: 0,
          contract_value_to: 0,
          tender_value_from: 0,
          tender_value_to: 0,
        }));
        setIsFilter(true);
        // setAllTags((prev) => ({ ...prev }));
        break;
      case "From Value":
        setFromValue(0);
        setToValue(0);
        setTenderValueOperator(2);
        setTenderForm((prev) => ({
          ...prev,
          tender_value_operator: 0,
          contract_value_operator: 0,
          contract_value_from: 0,
          contract_value_to: 0,
          tender_value_from: 0,
          tender_value_to: 0,
        }));
        setIsFilter(true);

        break;
      case "To Value":
        setToValue(0);
        setTenderValueOperator(2);
        setTenderForm((prev) => ({
          ...prev,
          tender_value_operator: 2,
          contract_value_to: 0,
          tender_value_to: 0,
        }));
        setIsFilter(true);

        break;
      case "Participated Bidders":
        setParticipantName(null);
        setTenderForm((prev) => ({
          ...prev,
          participant_name: "",
        }));
        setIsFilter(true);

        break;
      case "Winner Bidder":
        setWinnerBidderName(null);
        setTenderForm((prev) => ({
          ...prev,
          winner_bidder: "",
        }));
        setIsFilter(true);

        break;
      case "Stage":
        setTenderStageTag(null);
        setTenderForm((prev) => ({ ...prev, stage: "" }));
        setIsFilter(true);

        break;
      case "Date":
        setToDate("");
        setFromDate("");
        setTenderForm((prev) => ({
          ...prev,
          contract_date_to: "",
          contract_date_from: "",
        }));
        setIsFilter(true);

        break;
      case "Select Category":
        setKeyWordTags(null);
        setTenderForm((prev) => ({
          ...prev,
          keyword_ids: 0,
          product_id: 0,
        }));
        setIsFilter(true);

        break;
      case "Refrence Id":
        setRefrenceId("");
        setTenderForm((prev) => ({ ...prev, tender_number: "" }));
        setIsFilter(true);

        break;
      case "SubIndustry":
        setSubIndustryTag(null);
        setTenderForm((prev) => ({ ...prev, sub_industry_id: 0 }));
        setIsFilter(true);

        break;
      case "WebSite":
        setWebsiteType("All");
        setTenderForm((prev) => ({ ...prev, name_of_website: 1 }));
        setIsFilter(true);

        break;
      default:
        console.log("handle delete clicked");
        break;
    }
  };

  return (
    <div className="tag-outside-area">
      <div className="tag-outside-area-inner">
        {allTags.map(
          (res, i) =>
            res !== null && (
              <Chip
                key={i}
                label={res.type + "  :-  " + res?.title}
                onDelete={(e) => handleDelete(e, res)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Tags;

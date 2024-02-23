import React from "react";
import { compareCompetitors } from "../../_services/compareCompetitorsServices";
import { useState } from "react";
import { useEffect } from "react";
import MuiSinglSelect from "../../components/mui-autocomplete/MuiSingleSelect";

const KeyWord = ({ keywordTags, setKeyWordTags, fromPage, isProduct }) => {
  const [text, setText] = useState("");
  const [keywordList, setKeywordList] = useState([]);

  const handleKeyWord = async () => {
    try {
      const res = await compareCompetitors.getKeywordByName({
        keywordName: text,
        pageNo: 1,
        noOfRecords: 10,
      });
      res.Success && res.TotalRecord > 0
        ? setKeywordList(
            res.Data.map((object) => ({
              ...object,
              title: object.keyword_name,
              // type: "Category",
            })).sort((a, b) => {
              if (a.keyword_name < b.keyword_name) {
                return -1;
              }
              if (a.keyword_name > b.keyword_name) {
                return 1;
              }
              return 0;
            })
          )
        : setKeywordList([]);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    text.length >= 3 && handleKeyWord();
  }, [text]);

  return (
    <div className={fromPage !== "comparePage" ? "state-area" : ""}>
      <MuiSinglSelect
        setText={setText}
        name={isProduct ? "Select Category" : "Keyword"}
        options={keywordList}
        selectedValue={keywordTags}
        setSelectedValue={setKeyWordTags}
      />
    </div>
  );
};

export default KeyWord;

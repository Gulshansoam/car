import React from "react";
import StateViseComparisionChart from "./StateViseComparisionChart";
import TenderOwnerShipComparisionChart from "./TenderOwnerShipComparisionChart";
import IndividualComparison from "./IndividualComparison";

const CompanyDetailData = ({
  companyDetail,
  open,
  setOpen,
  drawerData,
  setDrawerData,
  formData,
  selectedKeyWord,
  selectedState,
  wordSearch,
  subIndustryTag
}) => {
  return (
    <div
      className={
        companyDetail?.length < 3
          ? "individual-comparison-area two-coluam-area"
          : "individual-comparison-area"
      }
    >
      <div className="individual-comparison-title-area">
        <div className="row">
          <IndividualComparison
            formData={formData}
            companyDetail={companyDetail}
            selectedState={selectedState}
            selectedKeyWord={selectedKeyWord}
            wordSearch={wordSearch}
            subIndustryTag={subIndustryTag}
          />

          <TenderOwnerShipComparisionChart
            companyDetail={companyDetail}
            formData={formData}
            open={open}
            setOpen={setOpen}
            drawerData={drawerData}
            setDrawerData={setDrawerData}
            selectedState={selectedState}
            selectedKeyWord={selectedKeyWord}
            wordSearch={wordSearch}
            subIndustryTag={subIndustryTag}
          />

          <StateViseComparisionChart
            companyDetail={companyDetail}
            formData={formData}
            selectedState={selectedState}
            selectedKeyWord={selectedKeyWord}
            wordSearch={wordSearch}
            subIndustryTag={subIndustryTag}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailData;

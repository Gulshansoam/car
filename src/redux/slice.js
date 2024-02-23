import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialListing: {
    result_id: 0,
    search_text: "",
    contract_date_from: "",
    contract_date_to: "",
    publication_date_from: localStorage.getItem("from_date"),
    publication_date_to: localStorage.getItem("to_date"),
    state_ids: "",
    city_ids: "",
    keyword_ids: 0,
    name_of_website: 1,
    organization_id: 0,
    organization_type_name: "",
    tender_value_operator: 0,
    contract_value_operator: 0,
    contract_value_from: 0,
    contract_value_to: 0,
    tender_value_from: 0,
    tender_value_to: 0,
    bidder_name: "",
    participant_name: "",
    winner_bidder: "",
    stage: "",
    sort_by: 3,
    sort_type: 2,
    page_no: 1,
    record_per_page: 20,
    tender_status: 0,
    search_by_split_word: false,
    user_id: 0,
    user_query_id: 0,
    tender_number: "",
    tab_id: 0,
    product_id: 0,
    search_by: 0,
    sub_industry_id: 0,
    // user_id: parseInt(localStorage.getItem("user_id")),
    // user_query_id: parseInt(
    //   localStorage.getItem("user_email_service_query_id")
    // ),
  },
  initialResultListing: null,
  selectedListing: null,
  bidderName: "",
};

const listingSlice = createSlice({
  name: "Model",
  initialState,
  reducers: {
    setListingModel: (state, action) => {
      state.initialListing = action.payload;
    },
    setResultListingModel: (state, action) => {
      state.initialResultListing = action.payload;
    },
    setSelectedListing: (state, action) => {
      state.selectedListing = action.payload;
    },
    setBidderName: (state, action) => {
      state.bidderName = action.payload;
    },
  },
});

export const {
  setListingModel,
  setSelectedListing,
  setBidderName,
  setResultListingModel,
} = listingSlice.actions;
export default listingSlice.reducer;

import React from "react";
import { useTheme } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { tenderResultService } from "../../_services/tenderResultPageServices";
import { useState } from "react";

const AddToFavourite = ({ result, setDataFound, fromFavorite, setPage }) => {
  const theme = useTheme();
  const [resultData, setResultData] = useState(result);

  const handleFavourite = (e, result) => {
    setPage(1);
    // setFreshResultData(freshResultData.map())
    fromFavorite && setDataFound(false);
    setResultData((prev) => ({ ...prev, is_favorite: !prev.is_favorite }));
    tenderResultService
      .insertFavouriteResult({
        user_id: localStorage.getItem("user_id"),
        result_id: result.result_id,
        is_favorite: !result.is_favorite,
      })
      .then((res) => {
        fromFavorite && setDataFound(true);
      });
  };

  return (
    <a onClick={(e) => handleFavourite(e, result)}>
      {resultData.is_favorite === true ? (
        <FavoriteIcon
          style={{
            color: theme.palette.primary.main,
          }}
          className="listing-icon"
        />
      ) : (
        <FavoriteBorderIcon
          style={{
            color: theme.palette.primary.main,
          }}
          className="listing-icon"
        />
      )}
    </a>
  );
};

export default AddToFavourite;

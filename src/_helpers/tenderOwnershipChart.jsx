export function tenderOwnerShipColor(colorDetail) {
  if (
    colorDetail !== undefined &&
    colorDetail !== null &&
    colorDetail.length > 0
  ) {
    const ownerShipColors = colorDetail.map((res) =>
      res.organization_type_name.toLowerCase() === "central government"
        ? "#008ffb" // Blue color for central govt
        : res.organization_type_name.toLowerCase() === "state government"
        ? "#00ab55" // Green color for state govt
        : res.organization_type_name.toLowerCase() === "government"
        ? "#ff4560"
        : res.organization_type_name.toLowerCase() === "corporation"
        ? "#feb019"
        : res.organization_type_name.toLowerCase() === "association"
        ? "#775dd0"
        : res.organization_type_name.toLowerCase() === "private sector"
        ? "#79f0e1"
        : res.organization_type_name.toLowerCase() === "co-operative"
        ? "#ed4b9b"
        : res.organization_type_name.toLowerCase() ===
          "public sector undertaking"
        ? "#b45f06"
        : res.organization_type_name.toLowerCase() === "trust"
        ? "#ffd966"
        : ""
    );
    return ownerShipColors;
  }
}

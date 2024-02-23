// export function convertToIndianCurrency(y) {
//   var x = parseFloat(y).toFixed(2);
//   x = x.toString();
//   var afterPoint = "";
//   if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
//   x = Math.floor(x);
//   x = x.toString();
//   var lastThree = x.substring(x.length - 3);
//   var otherNumbers = x.substring(0, x.length - 3);
//   if (otherNumbers != "") lastThree = "," + lastThree;
//   var res =
//     otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
//   return res;
// }

export function convertToIndianCurrency(y) {
  // const x = "1234433.1234";
  // console.log(parseFloat(parseFloat(x).toFixed(2)).toLocaleString("en-IN"));

  // console.log(parseFloat(parseFloat(y).toFixed(2)).toLocaleString("en-IN"));
  const value = parseFloat(parseFloat(y).toFixed(2)).toLocaleString("en-IN");
  if (value.split(".").length > 0) {
    return parseFloat(value.split(".")[1]) > 0 ? value : value + ".00";
  } else {
    return value + ".00";
  }
}
// export function valueConvert(value) {
//   var result = null;
//   if (value === undefined) {
//     value = 0;
//   }
//   value = parseFloat(value);
//   if (value < 1.0) {
//     result = "0";
//   } else {
//     if (value >= 1000000000000) {
//       result = (value / 1000000000000).toFixed(2) + " Tn";
//     } else if (value >= 1000000000 && value <= 1000000000000 - 1) {
//       result = (value / 1000000000).toFixed(2) + " B";
//     } else if (value >= 10000000 && value <= 1000000000 - 1) {
//       result = (value / 10000000).toFixed(2) + " Cr.";
//     } else if (value >= 100000 && value <= 10000000 - 1) {
//       result = (value / 100000).toFixed(2) + " Lac";
//     } else if (value >= 1000 && value <= 100000 - 1) {
//       result = (value / 1000).toFixed(1) + " K";
//     } else {
//       result = value;
//     }
//   }
//   return result;
// }

export function valueConvert(value) {
  var result = null;
  if (value === undefined) {
    value = 0;
  }
  value = parseFloat(value);
  if (value < 1.0) {
    result = "0";
  } else {
    if (value >= 10000000) {
      result = (value / 10000000).toFixed(2) + " Cr";
    } else if (value >= 100000 && value <= 10000000 - 1) {
      result = (value / 100000).toFixed(2) + " Lac";
    } else if (value >= 1000 && value <= 100000 - 1) {
      result = (value / 1000).toFixed(2) + " K";
    } else {
      result = value;
    }
    // else if (value > 100 && value < 1000 - 1) {
    //   result = (value / 100).toFixed(2) + " Hundred";
    // }
  }
  return result;
}

// export const internationalValueConvert = (value) => {
//   if (value === undefined) {
//     value = 0;
//   }
//   var result = null;
//   value = parseFloat(value);
//   if (value < 1.0) {
//     result = 0;
//   } else {
//     if (value >= 1000000000000) {
//       result = (value / 1000000000000).toFixed(2) + " Tr";
//     } else if (value >= 1000000000 && value < 1000000000000) {
//       result = (value / 1000000000).toFixed(2) + " Bn";
//     } else if (value > 1000000 && value < 1000000000) {
//       result = (value / 1000000).toFixed(2) + " M";
//     } else if (value >= 1000 && value < 1000000) {
//       result = (value / 1000).toFixed(2) + " K";
//     } else result = value;
//   }
//   return result;
// };

const dateCondition = [undefined, null, "1752-12-31", "1753-01-01", ""];
export function convertDateFormat(dateStr) {
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var dd = dateStr.toString().split(" ")[2];
  var mm = month.indexOf(dateStr.toString().split(" ")[1]) + 1;
  if (mm <= 9) {
    mm = "0" + mm;
  }
  var yyyy = dateStr.toString().split(" ")[3];

  var date = yyyy + "-" + mm + "-" + dd;

  if (!dateCondition.includes(date)) {
    return date;
  } else {
    return "Refer To Document";
  }
}


// date format yyyy-mm-dd.........................................
export function dateConvert(str) {
  if (!dateCondition.includes(str)) {
    return str.toString().split("-").reverse().join("-");
  } else {
    return "Refer To Document";
  }
}

//***********only show back dates from current date***************** */

export function newDateConvert(str) {
  if (!dateCondition.includes(str)) {
    const inputDate = new Date(str);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      return str.toString().split("-").reverse().join("-");
    } else {
      return "Refer To Document";
    }
  } else {
    return "Refer To Document";
  }
}

import { Co2Sharp } from "@mui/icons-material";
import moment from "moment";

var months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export function converterDefaultValue(dateData) {
  let monthSet = months.indexOf(dateData[1].toLowerCase()) + 1;
  if (monthSet <= 9) {
    monthSet = "0" + monthSet;
  }
  let finalDate = dateData[3] + "-" + monthSet + "-" + dateData[2];
  return finalDate;
}

export function ConvertFromDateFormat(e) {
  let date = e[0].$d.toString().split(" ");
  let monthSet = months.indexOf(date[1].toLowerCase()) + 1;
  if (monthSet <= 9) {
    monthSet = "0" + monthSet;
  }
  let finalDate = date[3] + "-" + monthSet + "-" + date[2];
  return finalDate;
}

export function ConvertToDateFormat(e) {
  let date = e[1].$d.toString().split(" ");
  let monthSet = months.indexOf(date[1].toLowerCase()) + 1;
  if (monthSet <= 9) {
    monthSet = "0" + monthSet;
  }
  let finalDate = date[3] + "-" + monthSet + "-" + date[2];
  return finalDate;
}

const getMonthStartAndEndDates = (year, month) => {
  const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();
  return { startDate, endDate };
};

export function monthWiseConvertor(e) {
  const newData = e.map((str) => str.replace(/'/g, ""));
  let date = months.indexOf(e[0].toLowerCase()) + 1;
  const add = Number(newData[1]) + 2000;
  const { startDate, endDate } = getMonthStartAndEndDates(add, date);
  const sDate = converterDefaultValue(startDate.toString().split(" "));
  const eDate = converterDefaultValue(endDate.toString().split(" "));
  return { sDate, eDate };
}

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
  var yyyy = dateStr.toString().split(" ")[3];

  var date = yyyy + "-" + mm + "-" + dd;
  return date;
}

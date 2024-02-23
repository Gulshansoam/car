import moment from "moment";
import { converterDefaultValue } from "../../layouts/dashboard/header/components/DateConvertor";

export function fromDate() {
  // alert(localStorage.getItem("from_date"))
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('datefrom');

  return (myParam !== undefined && myParam !== null) ? myParam : localStorage.getItem("from_date") !== null ? localStorage.getItem("from_date") : fromDefaulDate();
}
export function toDate() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('dateto');
  return (myParam !== undefined && myParam !== null) ? myParam : localStorage.getItem("to_date") !== null ? localStorage.getItem("to_date") : toDefaultDate();
}

export function fromDefaulDate() {
  return converterDefaultValue(
    moment().subtract(11, "months").startOf("month")._d.toString().split(" ")
  );
}


export function toDefaultDate() {
  return converterDefaultValue(
    moment().endOf("month")._d.toString().split(" ")
  );
}

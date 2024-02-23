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

export const ConvertDateFormat = (e) => {
  let date = e._d.toString().split(" ");
  let monthSet = months.indexOf(date[1].toLowerCase()) + 1;
  if (monthSet <= 9) {
    monthSet = "0" + monthSet;
  }

  let finalDate = monthSet + "-" + date[2] + "-" + date[3];


  return finalDate;
};

export const ConvertDateToFormat = (e) => {
  if (e !== undefined) {
    let date = e.split(" ")[0];
    const str = months[date.split("-")[0] - 1];

    const str2 = str.toUpperCase();
    // let finalDate =
    //   date.split("-")[2].toString() === "1753"
    //     ? "refer to document"
    //     : str2 + " " + date.split("-")[1] + "," + " " + date.split("-")[2];
    let finalDate =
      str2 + " " + date.split("-")[1] + "," + " " + date.split("-")[2];
    return finalDate;
  }
};

export const DateDifference = (openingDate, closingDate) => {
  if (openingDate !== undefined && closingDate !== undefined) {
    const oneDay = 24 * 60 * 60 * 1000;
    const openDate = openingDate.split(" ")[0];
    const finalOpenDate = openDate.split("-");

    const closeDate = closingDate.split(" ")[0];
    const finalCloseDate = closeDate.split("-");

    if (finalOpenDate[2] <= 9) {
      finalOpenDate[2] = "0" + finalOpenDate[2];
    }

    const firstDate = new Date(`
        ${parseInt(finalOpenDate[0])}/
        ${parseInt(finalOpenDate[1])}/
       ${parseInt(finalOpenDate[2])}`);
    const secondDate = new Date(`
        ${parseInt(finalCloseDate[0])} /
          ${parseInt(finalCloseDate[1])} /
          ${parseInt(finalCloseDate[2])}`);
    const diffDays = (firstDate.getTime() - secondDate.getTime()) / oneDay;
    return diffDays;
  }
};

export const DateConvert = () => {
  const todayDate = new Date();
  let dateConvert = todayDate.toString().slice(0, 24).split(" ");
  const month = months.indexOf(dateConvert[1].toLowerCase()) + 1;
  var finalDate =
    month + "-" + dateConvert[2] + "-" + dateConvert[3] + " " + dateConvert[4];

  return finalDate;
};

export const DateFormet = (e) => {
  if (e !== undefined) {
    let str = e.split(" ")[0];
    const month = months.indexOf(str.toLowerCase()) + 1;
    let finalDate =
      month + "-" + e.split(" ")[1].split(",")[0] + "-" + e.split(", ")[1];
    return finalDate;
  }
};

export const wordHighLighter = (data, category) => {
  if (category !== "") {
    const words = category.split(" ");
    const str = new RegExp(words.join("|"), "gi");
    const newData = data.replace(str, function (matched) {
      return `<span class='wordHighLighter'>${matched}</span>`;
    });
    return newData;
  } else {
    return data;
  }
};



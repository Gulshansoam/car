export const truncateName = (bidderNamer) => {
  if (bidderNamer.length > 30) {
    return `${bidderNamer.slice(0, 30)}...`;
  } else return bidderNamer;
};

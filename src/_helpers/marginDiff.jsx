export function marginDiff(estimatedValue, contractValue) {
  if (estimatedValue === 0 || contractValue === 0) {
    return "Refer to Documents";
  } else if (estimatedValue > contractValue) {
    var result = ((estimatedValue - contractValue) / estimatedValue) * 100;
    return result.toFixed(2) + "% Below";
  } else if (estimatedValue === contractValue) {
    return "0.00%";
  } else {
    var result = ((contractValue - estimatedValue) / contractValue) * 100;
    return result.toFixed(2) + "% Above";
  }
}

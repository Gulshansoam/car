export const ValidaterHelper = {
  Required,
  IsNumeric,
};

// eslint-disable-next-line no-useless-escape
export function IsNumeric(val) {
  return /^\d+$/.test(val);
}

export function ContactNumber(val, length) {
  length = length !== undefined || length !== null ? 10 : parseInt(length);
  return val !== undefined && val.trim().length === parseInt(length)
    ? { isValid: true, message: "" }
    : { isValid: false, message: "Please enter valid Contact No!" };
}

function Required(val) {
  return val !== undefined && val.trim().length > 0
    ? { isValid: true, message: "" }
    : { isValid: false, message: "This field is Required!" };
}




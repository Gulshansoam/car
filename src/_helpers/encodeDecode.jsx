export function encodeString(decodeStr) {
  return window.btoa(decodeStr);
}

export function decodeString(encodedStr) {
  return window.atob(encodedStr);
}

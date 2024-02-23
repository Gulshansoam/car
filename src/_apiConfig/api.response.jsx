export function ApiResponse(Success,Message,IsAuthFailure,Data,TotalRecord) {
  return {
      Success: Success,
      Message: Message,
      IsAuthFailure: IsAuthFailure,
      Data: Data,
      TotalRecord: 0
  };
}
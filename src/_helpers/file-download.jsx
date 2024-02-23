import { http } from "../_apiConfig/http";
export const download = (fileURL, filename, isToken, customheader) => {
  http.download(fileURL).then((res) => {
    if (res.Success) {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      // Append to html link element page
      document.body.appendChild(link);
      // Start download
      link.click();
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }
  });
};

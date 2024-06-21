export function toDataURL(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

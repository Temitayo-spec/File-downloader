const fileInput = document.querySelector("input"),
  downloadButton = document.querySelector("button");

downloadButton.addEventListener("click", function (e) {
  e.preventDefault();
  downloadButton.innerText = "Downloading...";

  // fetch the file
  fetch(fileInput.value)
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      // create a url from the blob
      var url = URL.createObjectURL(blob);
      // create a link element
      var a = document.createElement("a");
      // set the href to the url
      a.href = url;
      // set the download attribute to the filename
      a.download = fileInput.value.split("/").pop();
      // append the link to the document body
      document.body.appendChild(a);
      // click the link to trigger the download
      a.click();
      // remove the link from the document
      document.body.removeChild(a);
      // revoke the blob url to free up memory
      URL.revokeObjectURL(url);
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      downloadButton.innerText = "Download";
    });
});

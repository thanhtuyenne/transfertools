import React from "react";
export function createName_Blob(blob) {
  // Get the current date and time
  var date = new Date();
  // Get the year, month, day, hour, minute, second, and millisecond
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var millisecond = date.getMilliseconds();
  // Generate a random number between 0 and 9999
  var random = Math.floor(Math.random() * 10000);
  // Combine the date, time, and random number with dashes
  var name =
    year +
    "_" +
    month +
    "_" +
    day +
    "_" +
    hour +
    "_" +
    minute +
    "_" +
    second +
    "_" +
    millisecond +
    "_" +
    random;
  // Get the extension from the blob's type
  var extension = blob.type.split("/")[1];
  // Add the extension to the name
  name += "." + extension;
  // Return the name
  return name;
}
export function blobToFile(blob) {
  var file = new File([blob], createName_Blob(blob), {
    type: blob.type,
    lastModified: Date.now(),
  });
  return file;
}
export function getFileFromUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // You can also use URL.createObjectURL(blob) to create a temporary URL for the blob
        resolve(blobToFile(blob));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

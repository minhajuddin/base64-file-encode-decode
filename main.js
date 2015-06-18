(function() {
  "use strict";
  var fileInput = document.getElementById("file");

  function downloadFile(name, url) {
    //download the file
    var ael = document.createElement('a');

    ael.setAttribute('href', url);
    ael.setAttribute('download', name);
    ael.style.display = 'none';
    document.body.appendChild(ael);

    ael.click();

    document.body.removeChild(ael);
  }

  //reads the file and encodes it into a base64 text
  function encode() {
    var reader = new FileReader(),
    file = fileInput.files[0];

    //gets triggered when reading is complete and the result is ready
    reader.onload = function() {
      var data = reader.result,
      encodedData = btoa(data),
      //btoa => binarytoascii (binary to base64)
      blob = new Blob([encodedData]);

      downloadFile(file.name + ".txt", URL.createObjectURL(blob));
    }

    //read
    reader.readAsBinaryString(file);
  }

  //source: http://stackoverflow.com/a/20151856/24105
  function base64toBlob(base64Data) {
    var sliceSize = 1024,
    byteCharacters = atob(base64Data),
    bytesLength = byteCharacters.length,
    slicesCount = Math.ceil(bytesLength / sliceSize),
    byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);

      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {});
  }

  function decode() {
    var reader = new FileReader(),
    file = fileInput.files[0];

    //gets triggered when reading is complete and the result is ready
    reader.onload = function() {
      var data = reader.result,
      blob = base64toBlob(data);

      downloadFile(file.name.replace(/\.txt$/i, ''), URL.createObjectURL(blob));
    }

    //read
    reader.readAsText(file);
  }

  //wire up the handlers
  document.getElementById("encode").addEventListener('click', encode);
  document.getElementById("decode").addEventListener('click', decode);
} ())


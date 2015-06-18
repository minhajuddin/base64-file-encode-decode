(function() {
  "use strict";
  var fileInput = document.getElementById("file");

  //reads the file and encodes it into a base64 text
  function encode() {
    var reader = new FileReader(),
    file = fileInput.files[0];

    //gets triggered when reading is complete and the result is ready
    reader.onload = function() {
      var data = reader.result,
      encodedData = btoa(data),
      //btoa => binarytoascii (binary to base64)
      blob = new Blob([encodedData]),

      //download the file
      ael = document.createElement('a');
      ael.setAttribute('href', URL.createObjectURL(blob));
      ael.setAttribute('download', file.name + ".txt");
      ael.style.display = 'none';
      document.body.appendChild(ael);
      ael.click();
      document.body.removeChild(ael);
    }

    //read
    reader.readAsBinaryString(file);
  }

  function binaryArrayFromBase64(encodedData) {
    encodedData = atob(encodedData);
    //asciitobinary => base64 to binary
    var bytes = new Array(encodedData.length);
    for (var i = 0; i < encodedData.length; i++) {
      bytes[i] = encodedData.charCodeAt(i);
    }
    return new Uint8Array(bytes);
  }

  function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    var sliceIndex = 0;
    for (; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);

      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {
      type: contentType
    });
  }

  function decode() {
    var reader = new FileReader(),
    file = fileInput.files[0];

    //gets triggered when reading is complete and the result is ready
    reader.onload = function() {
      var data = reader.result,
      blob = base64toBlob(data),

      ael = document.createElement('a');

      ael.setAttribute('href', URL.createObjectURL(blob));
      ael.setAttribute('download', file.name.replace(/\.txt$/i, ''));

      ael.style.display = 'none';
      document.body.appendChild(ael);

      ael.click();

      document.body.removeChild(ael);
    }

    //read
    reader.readAsText(file);
  }

  //wire up the handlers
  document.getElementById("encode").addEventListener('click', encode);
  document.getElementById("decode").addEventListener('click', decode);
} ())


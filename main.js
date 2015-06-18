(function() {
  "use strict";
  var fileInput = document.getElementById("file");

  function binaryArrayFromBase64(encodedData) {
    encodedData = atob(encodedData);
    var bytes = new Array(encodedData.length);
    for (var i = 0; i < encodedData.length; i++) {
      bytes[i] = encodedData.charCodeAt(i);
    }
    return new Uint8Array(bytes);
  }

  function downloadBlob(blob, filename) {
    var ael = document.createElement('a');

    ael.setAttribute('href', URL.createObjectURL(blob));
    ael.setAttribute('download', filename);

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
      encodedData = btoa(data),//btoa => binarytoascii (binary to base64)
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

  function encdec(readerFnName, encodeDecodeFn, filenamerFn) {
    var reader = new FileReader(),
    file = fileInput.files[0];

    //gets triggered when reading is complete and the result is ready
    reader.onload = function() {
      var data = reader.result,
      decodedData = encodeDecodeFn(data),
      blob = new Blob([decodedData]),
      ael = document.createElement('a');

      ael.setAttribute('href', URL.createObjectURL(blob));
      ael.setAttribute('download', filenamerFn(file.name));

      ael.style.display = 'none';
      document.body.appendChild(ael);

      ael.click();

      document.body.removeChild(ael);
    }

    //read
    reader[readerFnName](file);
  }

  //wire up the handlers
  document.getElementById("encode").addEventListener('click', encode);
  document.getElementById("decode").addEventListener('click', function() {
    encdec('readAsText', atob, function(name) {
      return name.replace(/\.txt$/i, '')
    })
  });

} ())


(function() {
  "use strict";
  var fileInput = document.getElementById("file");

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
  document.getElementById("encode").addEventListener('click', function() {
    encdec('readAsBinaryString', btoa, function(name) {
      return name + ".base64"
    })
  });
  document.getElementById("decode").addEventListener('click', function() {
    encdec('readAsText', atob, function(name) {
      return name.replace(/\.base64$/i, '')
    })
  });

} ())


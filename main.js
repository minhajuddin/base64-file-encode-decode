(function() {
  var b = new Blob(["this is a blob"]);
  a = document.createElement("a")
  a.setAttribute("href", URL.createObjectURL(b))
  a.setAttribute('download', "awesome.txt");
  a.innerHTML = "Download";
  document.body.appendChild(a);

  return

  var fileInput = document.getElementById("file");
  //returns a reader
  // function readFile(binary){
  // var fileRef = fileInput.files[0],
  // reader = new FileReader();
  // if (!!binary){
  // }
  // }
  function encode() {
    var reader = new FileReader(),
    file = fileInput.files[0];

    reader.onload = function() {
      var data = reader.result;
      var encodedData = btoa(data);

      var blob = new Blob([encodedData])
      var pom = document.createElement('a');
      //data:application/octet-stream;charset=utf-16le;base64,//5mAG8AbwAgAGIAYQByAAoA
      pom.setAttribute('href', URL.createObjectURL(blob));
      pom.setAttribute('download', file.name + ".base64");

      pom.style.display = 'none';
      document.body.appendChild(pom);

      pom.click();

      document.body.removeChild(pom);
    }

    //read
    reader.readAsBinaryString(file);
  }

  function decode() {}

  //wire up the handlers
  document.getElementById("encode").addEventListener('click', encode);
  document.getElementById("decode").addEventListener('click', decode);

} ())


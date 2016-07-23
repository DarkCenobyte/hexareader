var BUFFER_SIZE = 256; //MB

const MB_TO_B = 1000000;

$("body").ready(function(){

  function displayFile() {

  }

  function readFile(file, start, end) {
    var fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = function(){
      var view = new DataView(fr.result);
      var lines = 0;
      for(var i=0;i<file.size;i++){
        $('#hexView').append("<span class='cells' id='pos-"+(start + i)+"'>"+((view.getUint8(i) < 0x10) ? ("0"+view.getUint8(i).toString(16)) : (view.getUint8(i).toString(16)))+" </span>");
        if(i !== 0 && i % 16 === 0) {
          lines++;
          $('#hexView').append("<span><br /></span>");
          $('.lines').append("<br />"+lines.toString(16));
        }
      }
      console.log(view.getUint8(0).toString(16));
    }
  }

  $(document).on('drop', '.dropzone', function(event) {
    if(event.originalEvent.dataTransfer) {
      if(event.originalEvent.dataTransfer.files.length) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.originalEvent.dataTransfer.files[0]);
        readFile(event.originalEvent.dataTransfer.files[0].slice(0, BUFFER_SIZE*MB_TO_B), 0, BUFFER_SIZE*MB_TO_B);
        $(this).css('display', 'none');
      }
    }
  });

  $(document).on('dragover', '.dropzone', function(e){
              e.preventDefault();
              e.stopPropagation();
              $(this).css('background-color', 'darkgreen');
              return false;
  });

  $(document).on('dragleave', '.dropzone', function(e) {
              e.preventDefault();
              e.stopPropagation();
              $(this).css('background-color', 'green');
              return false;
  });
});

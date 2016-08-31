$(document).ready(
  function () {
    var inputs = $('input');
    var c0 = inputs['0'];
    $('#reset-puzzle').click(
      function () {
        var c, k;
        $(this).attr('disabled', 'disabled');
        for (k = 0; k < 81; k++) {
          c = $(inputs[String(k)]);
          c.val("");
          if (c.css("background-color")) {
            c.css("background-color", "");
          }
        }
        c0.focus(); 
        $(this).removeAttr('disabled');
        if ($('#solve-puzzle').attr('disabled')) {
          $('#solve-puzzle').removeAttr('disabled');
        }
      });

    $('#solve-puzzle').click(
      function () {
        var pz = [];
        var userin = [];
        var c, k, v, vv;
        var sbtn = $(this);
        for (k = 0; k < 81; k++) {
          c = $(inputs[String(k)]);
          vv = c.val();
          if (vv === '' || vv === '0') {
            v = 0;
          } else {
            v = Number(vv);
            if (isNaN(v)) {
                c.css("background-color", "#bf4040");
                window.alert('You have input invalid character');
                return;
            }
            userin.push(k);
          }
          pz.push(v);
        }
        $.ajax({
          url: 'api/solve',
          type: 'POST',
          data: {
            puzzle: JSON.stringify(pz)
          },
          dataType: 'json',
          success: function (data, status, xhr) {
            var idx;
            if (data.eno === 0) {
              sbtn.attr('disabled', 'disabled');
              for (var i = 0; i < data.solution.length; i++) {
                var v = data.solution[i];
                var c = $(inputs[String(i)]);
                c.val(String(v));
              }
              for (i = 0; i < userin.length; i++) {
                  idx = userin[i];
                  c = $(inputs[String(idx)]);
                  c.css("background-color", "#ccc");
              }
            } else if (data.eno === 1) {
              window.alert("Invalid input puzzle, please check again");
            } else if (data.eno === 2) {
              window.alert("No proper solution could be found");
            } else {
              return;
            }
          }
	  /*
          error: function (xhr, status) {
            window.alert("Cannot Find Any Solution, Please Check Your Puzzle!");
	  }
	  */
        });
        // $(this).removeAttr('disabled');
      });
  });




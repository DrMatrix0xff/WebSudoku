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
      });

    $('#solve-puzzle').click(
      function () {
        $(this).attr('disabled', 'disabled');
        var pz = [];
        var userin = [];
        var c, k, v, vv;
        for (k = 0; k < 81; k++) {
          c = $(inputs[String(k)]);
          vv = c.val();
          if (vv === '' || vv === '0') {
            v = 0;
          } else {
            v = Number(vv);
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
            } else {
              window.alert("Cannot Find Any Solution, Please Check Your Puzzle!");
            }
          }
	  /*
          error: function (xhr, status) {
            window.alert("Cannot Find Any Solution, Please Check Your Puzzle!");
	  }
	  */
        });
        $(this).removeAttr('disabled');
      });
  });




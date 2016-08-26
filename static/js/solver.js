$(document).ready(
  function () {
    var inputs = $('input');
    var c0 = inputs['0'];
    $('#reset-puzzle').click(
      function () {
        var c, k;
        $(this).attr('disabled', 'disabled');
        for (k = 0; k < 81; k++) {
          c = inputs[String(k)];
          c.value = "";
        }
        c0.focus(); 
        $(this).removeAttr('disabled');
      });

    $('#solve-puzzle').click(
      function () {
        $(this).attr('disabled', 'disabled');
        var pz = [];
        var c, k, v;
        for (k = 0; k < 81; k++) {
          c = inputs[String(k)];
          if (c.value === '') {
            v = 0;
          } else {
            v = Number(c.value);
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
            if (data.eno === 0) {
              for (var i = 0; i < data.solution.length; i++) {
                var v = data.solution[i];
                var c = inputs[String(i)];
                c.value = String(v);
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




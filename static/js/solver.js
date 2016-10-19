$(document).ready(
  function () {
    var inputs = $('input');
    var c0 = inputs['0'];
    c0.focus();
    $(document).keydown(
      function (e) {
        var fi = $('input:focus');
        var i = 0;
        for (i = 0; i < 81; i++) {
          if (inputs[String(i)] === fi[0]) {
            break;
          }
        }
        // console.log('i = %d', i);
        switch (e.which) {
          case 37:
            if (i >= 1) {
              i -= 1;
              inputs[String(i)].focus();
            }
            break;
          case 38:
            if (i >= 9) {
              i -= 9;
              inputs[String(i)].focus();
            }
            break;
          case 39:
            if (i < 80) {
              i += 1;
              inputs[String(i)].focus();
            }
            break;
          case 40:
            if (i <= 71) {
              i += 9;
              inputs[String(i)].focus();
            }
            break;
          default: return;
        }
        e.preventDefault();
      }
    );
    $('#reset-puzzle').click(
      function () {
        var c, k;
        for (k = 0; k < 81; k++) {
          c = $(inputs[String(k)]);
          c.val("");
          if (c.css("background-color")) {
            c.css("background-color", "");
          }
        }
        c0.focus(); 
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
                sbtn.attr('disabled', 'disabled');
                window.alert('You have input non-digit character!');
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
                  c.css("background-color", "#87ceeb");
              }
            } else if (data.eno === 1) {
              window.alert("Invalid input puzzle, please check again");
            } else if (data.eno === 2) {
              window.alert("No proper solution could be found");
            } else {
              return;
            }
          }
        });
      });
  });




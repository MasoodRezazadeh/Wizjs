$(document).ready(function() {
  let rows = [],
    vrows = [],
    counter = 1,
    wizCount = 0,
    currentWiz = 1;

  let options = {
    wizardsHeight: "80%",
    wizardsHolderWidth: "90%"
  };

  const wizRows = $(".wizRows");

  $(".wizHolder").css({ width: options.wizardsHolderWidth });
  wizRows.css({ height: options.wizardsHeight });

  $.each(wizRows, function(index, val) {
    /* iterate through array or object */
    $(val).attr("data-wizNum", counter);
    rows.push(val);
    vrows.push(val);
    wizCount = counter;
    counter++;
  })
    .promise()
    .then(function() {
      console.log(rows);
      console.log("wizNum = " + wizCount);
      $(".wizRows")
        .html(rows[0])
        .promise()
        .then(function() {
          $(".wizRows").after(
            '<br><div class="wizButtons"><button class="goPrevWiz"><span class="fa fa-chevron-left" style="margin-right:10px;position:relative;top:1px"></span>Prev</button><button class="goNextWiz">Next<span class="fa fa-chevron-right" style="margin-left:10px;position:relative;top:1px"></span></button><button class="endWiz"><span class="fa fa-magic" style="margin-right:10px;"></span>Save</button></div>'
          );
        });
      $(".mainBox").after(
        '<br><div class="stepsHolder">' + getSteps() + "</div>"
      );
      btnController();
    });

  $(document).on("click", ".goNextWiz", function(event) {
    event.preventDefault();
    /* Act on the event */
    nextWiz();
  });

  $(document).on("click", ".goPrevWiz", function(event) {
    event.preventDefault();
    /* Act on the event */
    prevWiz();
  });

  $(document).on("click", ".endWiz", function(event) {
    event.preventDefault();
    /* Act on the event */
    let form = $("<form action='post'></form>");
    $.each(vrows, function(index, val) {
      form.append(val);
    });

    console.log(form.serializeObject());
    alert(JSON.stringify(form.serializeObject()));
    $(".wizRows").html(rows[getWizLength() - 1]);
  });

  function getSteps() {
    let WizLength = getWizLength();
    let steps = "";
    for (let i = 0; i < WizLength; i++) {
      steps = steps + '<div class="step" id="' + i + '"></div>';
    }
    return steps;
  }

  function getCurrentWiz() {
    return $(".wizRow").data("wiznum");
  }

  function getWizLength() {
    return rows.length;
  }

  function nextWiz() {
    currentWiz = getCurrentWiz();
    let nextWizNum = currentWiz + 1,
      WizLength = getWizLength();

    if (nextWizNum > WizLength) {
    } else {
      $(".wizRows").html(rows[currentWiz]);
      btnController();
    }
  }

  function prevWiz() {
    currentWiz = getCurrentWiz();
    let prevWizNum = currentWiz - 1;

    if (prevWizNum < 1) {
    } else {
      $(".wizRows").html(rows[prevWizNum - 1]);
      btnController();
    }
  }

  function btnController() {
    currentWiz = getCurrentWiz();
    let nextWizNum = currentWiz + 1,
      prevWizNum = currentWiz - 1,
      WizLength = getWizLength();
    $(".here").removeClass("here");
    $("#" + (currentWiz - 1)).addClass("here");
    if (prevWizNum < 1) {
      $(".goPrevWiz").attr("disabled", "disabled");
    } else {
      $(".goPrevWiz").removeAttr("disabled");
    }

    if (nextWizNum > WizLength) {
      $(".goNextWiz").css("display", "none");
      $(".endWiz").css("display", "");
    } else {
      $(".endWiz").css("display", "none");
      $(".goNextWiz").css("display", "");
    }
  }

  $.fn.serializeObject = function() {
    let o = {};
    let a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    return o;
  };
});

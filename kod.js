window.onload = menu;



function menu() {
  var size = 12;
  var m = [];
  var nazwa = "menubox";
  let generatemenu = "";
  var list = ["Play", "ustawienia", "ranking", "autor"];
  for (let i = 0; i < 1; i++) {
    generatemenu +=
      "<div id='m" +
      i +
      "' class='minibox'><p class='minitext'>" +
      list[i] +
      " </p></div>";
  }
  $(".menubox").html(generatemenu);
  for (let i = 0; i < 2; i++) {
    m[i] = document.getElementById("m" + i);
  }

  m[0].addEventListener("click", function () {
    hide(nazwa, size);
  });

  m[1].addEventListener("click", function () {
    Play(size);
  });

  m[2].addEventListener("click", function () {
    Play(size);
  });

  m[3].addEventListener("click", function () {
    Play(size);
  });
}

function hide(nazwa, size) {
  $("." + nazwa).css("display", "none");
  $("." + nazwa).css("pointer-events", "none");
  Play(size);
}

function Play(size) {

  const start = new Date().getTime();

  // Wyświetlamy czas co sekundę
  setInterval(() => {
    // Obliczamy czas od momentu odpalenia programu
    const now = new Date().getTime();
    const timeElapsed = now - start;
  
    // Konwertujemy czas w milisekundach na format MM:SS
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const seconds = Math.floor((timeElapsed / 1000) % 60);
  
    // Wyświetlamy czas na ekranie
   if(minutes==0)
   {
    $("#czas").html(seconds+" s");
  
   }
   else{
    $("#czas").html(minutes+" min "+seconds+" s");

   

   }
    
  }, 1000);
  




  $(".board").css("display", "block");
  var generator = " ";
  var p = [];
  var clicked = [];
  var clicker = 0;
  var achtung = [];
  var liczklik = 0;
  var flagi = 0;
  var liczbabomb = size * 3 - 9;
  $("#pkt").html(liczbabomb);
  var flaglicz = 0;
  var tabelunia = []; //tabela
  for (let i = 0; i < size; i++) {
    for (let u = 0; u < size; u++) {
      generator =
        generator +
        "<div id='p" +
        (size * i + u) +
        "'class='field'><p class='te' id='k" +
        (size * i + u) +
        "'> </p> </div>";
    }
    generator = generator + "<div class='space'> </div>";
    $(".board").html(generator);
  }
  $(".field").css("height", "52" - size);
  $(".field").css("width", "52" - size);
  for (let i = 0; i < size * size; i++) {
    p[i] = document.getElementById("p" + i);

    p[i].addEventListener("click", function () {
      RevealField(i);
    });

    p[i].addEventListener("contextmenu", function (e) {
      e.preventDefault();
      flag(i);
    });
    //setTimeout(()=> console.log(i));
  }

  function RevealField(nr) {
    if ($("#p" + nr).hasClass("fieldB")) {
      flagnear(nr);
    }

    if ($("#p" + nr).hasClass("field")) {
      clicker++;
      console.log("siup" + nr);
      $("#p" + nr).removeClass("field");
      $("#p" + nr).addClass("fieldB");
      liczklik++;
      console.log(liczklik);

      if (
        liczklik == size * size - liczbabomb &&
        achtung.every((val) => {
          return val != nr;
        })
      ) {
        $(".field").css("pointer-events", "none");
        $(".flag").css("pointer-events", "none");
        setTimeout(win, 1000);
      }
      if (clicker == 1) {
        var hor = nr % size;
        var ver = Math.floor(nr / size);
        for (let m = -1; m <= 1; m++) {
          {
            if (hor + m > -1 && hor + m < size) {
              for (let n = -1; n <= 1; n++) {
                if (ver + n < size && ver + n > -1) {
                  let num = (ver + n) * size + hor + m;
                  tabelunia.push(num);
                }
              }
            }
          }
        }

        while (achtung.length < liczbabomb) {
          let random = Math.floor(Math.random() * (size * size - 1));
          if (
            tabelunia.every((val) => {
              return val != random;
            })
          ) {
            if (
              achtung.every((val) => {
                return val != random;
              })
            ) {
              achtung.push(random);
            }
          }
        }
      } else {
        achtung.forEach(function (value) {
          if (value == nr) {
            $("#p" + nr).removeClass("fieldB");
            $("#p" + nr).addClass("trap");

            setTimeout(() => {
              achtung.forEach(function (val) {
                if (val != nr) {
                  $("#p" + val).addClass("trap2");
                }
              });
            }, 990);

            $(".field").css("pointer-events", "none");
            $(".flag").css("pointer-events", "none");
            setTimeout(boom(), 2200);
          }
        });
      }

      clicked.forEach(function (val) {});

      var hor = nr % size;

      var ver = Math.floor(nr / size);
      var bombCount = 0;

      for (let m = -1; m <= 1; m++) {
        {
          if (hor + m > -1 && hor + m < size) {
            for (let n = -1; n <= 1; n++) {
              if (ver + n < size && ver + n > -1) {
                let num = (ver + n) * size + hor + m;
                achtung.forEach((val) => {
                  if (val == num) bombCount++;
                });
              }
            }
          }
        }
      }
      if ($("#p" + nr).hasClass("trap")) {
      } else {
        if (bombCount != 0) {
          $("#k" + nr).html(bombCount);
        }

        if (bombCount == 0) {
          for (let h = -1; h <= 1; h++) {
            if (hor + h > -1 && hor + h < size) {
              for (let y = -1; y <= 1; y++) {
                if (ver + y < size && ver + y > -1) {
                  let ni = (ver + y) * size + hor + h;
                  if ($("#p" + ni).hasClass("field")) {
                    /* $("#p" + ni).removeClass("field");
                  $("#p" + ni).addClass("fieldB"); */

                    RevealField(ni);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function flagnear(nr) {
    var bombCount = 0;
    flaglicz = 0;
    var hor = nr % size;
    var ver = Math.floor(nr / size);

    for (let h = -1; h <= 1; h++) {
      if (hor + h > -1 && hor + h < size) {
        for (let y = -1; y <= 1; y++) {
          if (ver + y < size && ver + y > -1) {
            let ni = (ver + y) * size + hor + h;
            if ($("#p" + ni).hasClass("flag")) {
              flaglicz++;
            }
            achtung.forEach((val) => {
              if (val == ni) bombCount++;
            });
          }
        }
      }
    }

    if (flaglicz == bombCount) {
      for (let h = -1; h <= 1; h++) {
        if (hor + h > -1 && hor + h < size) {
          for (let y = -1; y <= 1; y++) {
            if (ver + y < size && ver + y > -1) {
              let ni = (ver + y) * size + hor + h;
              if ($("#p" + ni).hasClass("field")) {
                RevealField(ni);
              }
            }
          }
        }
      }
    }
  }

  function boom() {
  
    $(".board").html("<h1> You Blow Up after </h1>"+document.getElementById("czas").innerHTML);
    
  }

  function win() {
    $(".board").css("text-color", "green");
    $(".board").html("<h1> You stay alive! </h1>"+document.getElementById("czas").innerHTML);
  }

  function flag(nr) {
    if ($("#p" + nr).hasClass("fieldB")) {
    } else {
      if ($("#p" + nr).hasClass("flag")) {
        $("#p" + nr).removeClass("flag");
        flagi--;
        $("#p" + nr).addClass("field");
      } else {
        $("#p" + nr).addClass("flag");
        flagi++;
        $("#p" + nr).removeClass("field");
      }
    }
      $("#pkt").html(liczbabomb - flagi);
    
  }
}

function rel() {
  location.reload();
}

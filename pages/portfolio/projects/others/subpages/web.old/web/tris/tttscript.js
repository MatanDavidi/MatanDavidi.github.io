var xml;

var log = $("#fLogin")[0];
var reg = $("#fRegister")[0];

log.addEventListener("keyup", function(event) {

    // Cancel the default action, if needed
    event.preventDefault();

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {

      // Trigger the button element with a click
      $("#fLogin input[type=button]").click();

    }

});

reg.addEventListener("keyup", function(event) {

    // Cancel the default action, if needed
    event.preventDefault();

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {

      // Trigger the button element with a click
      $("#fRegister input[type=button]").click();

    }

  });

function login() {

    var user = $("#fLogin input[name=uname]").val();
    var pass = $("#fLogin input[name=password]").val();

    if (user && user !== "") {

        if (pass && pass !== "") {

            $.post("xml/utente.xml", function(data) {

                xml = data;
                if (checkLogin(xml, user, pass)) {
                 
                    redirect(user);
                    
                } else {

                    alert("I dati inseriti non sono corretti.");

                }

            });

        } else {

            alert("Inserire una password.");    

        }

    } else {

        alert("Inserire un nome utente.");

    }

}

function checkLogin(dom, checkUser, checkPass) {

    var utenti = dom.getElementsByTagName('utente');

    for (var i = 0; i < utenti.length; i++) {

        const utente = utenti[i];

        const name = utente.getElementsByTagName('nome')[0].childNodes[0].nodeValue;
        const password = utente.getElementsByTagName('password')[0].childNodes[0].nodeValue;

        if (name.toLowerCase() == checkUser.toLowerCase()) {

            if (password == checkPass) {

                return true;

            }

        }
        
    }

    return false;

}

function register() {

    var user = $("#fRegister input[name=uname]").val();
    var password = $("#fRegister input[name=password]").val();
    var confPass = $("#fRegister input[name=confpass]").val();

    if (user && user !== "") {

        if (password && password !== "") {

            if (confPass && confPass !== "") {

                if (password === confPass) {

                    $.post("xml/utente.xml", function(data) {

                        xml = data;

                        if (checkRegister(xml, user)) {

                            $("#fRegister").submit();
    
                        } else {
    
                            alert("Il nome utente specificato esiste già.");
    
                        }
        
                    });

                } else {

                    alert("Le due password non combaciano.");

                }

            } else {

                alert("Inserire la conferma della password");

            }

        } else {

            alert("Inserire una password.");

        }

    } else {

        alert("Inserire un nome utente.");

    }

}

function checkRegister(data, name) {

    var users = data.getElementsByTagName('utente');

    for (var i = 0; i < users.length; i++) {
        
        const curName = users[i].getElementsByTagName('nome')[0].childNodes[0].nodeValue;

        if (name == curName) {

            return false;

        }
        
    }

    return true;

}

function redirect(username) {

    var windowWidth = screen.width / 2;
    var windowHeight = screen.height;

    var left = screen.width / 2 - windowWidth / 2;
    var top = screen.height / 2 - windowHeight / 2;

    console.log("WindowWidth: " + windowWidth);
    console.log("WindowHeight: " + windowHeight);
    console.log("Left: " + left);
    console.log("Top: " + top);

    window.open("game.php?name=" + username, "Tris", "left=" + left + ", top=" + top + ",width=" + windowWidth + ",height=" + windowHeight);

}


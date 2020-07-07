function game(level) { // u zavisnosti od kliknutog div-a, dobija se vrednost evel promenljive (3/4/5)
    $("#page").empty();
    var sol1 = [],
        sol2 = [],
        sol3 = []; // moguce kombinacije brojeva za svaki nivo 
    if (level == 3) {
        sol1 = [2, 6, 3, 1, 5, 8, 7, 4];
        sol2 = [6, 1, 3, 2, 8, 7, 5, 4];
        sol3 = [3, 5, 7, 8, 4, 2, 1, 6];
    } else if (level == 4) {
        sol1 = [14, 6, 12, 2, 1, 8, 4, 7, 5, 11, 13, 15, 10, 3, 9];
        sol2 = [10, 9, 8, 2, 14, 6, 5, 15, 11, 7, 3, 12, 13, 1, 4];
        sol3 = [11, 10, 5, 8, 2, 6, 14, 4, 13, 12, 15, 3, 7, 9, 1];
    } else if (level == 5) {
        sol1 = [1, 16, 2, 10, 5, 21, 11, 18, 22, 12, 23, 3, 24, 19, 7, 6, 4, 13, 8, 15, 17, 14, 9, 20];
        sol2 = [22, 6, 3, 4, 24, 7, 13, 2, 8, 9, 21, 1, 12, 10, 5, 16, 23, 20, 19, 14, 11, 15, 18, 17];
        sol3 = [12, 16, 6, 4, 24, 7, 2, 21, 13, 8, 22, 18, 5, 14, 17, 1, 3, 23, 9, 10, 11, 19, 15, 20];
    }
    var solpicker = [];
    solpicker = [sol1, sol2, sol3];
    var randomsol = solpicker[Math.floor(Math.random() * solpicker.length)]; //biranje nasumicne kombinacije

    var width = 0;  //sirina igre
    var height = 0; //visina igre
    var piecew = 0; //sirina jednog polja
    var pieceh = 0; //visina jednog polja
    var col = 0; //kolona
    var row = 0; //red
    var x = 0;  //promenljiva za for petlju
    var y = 0;  //promenljiva za for petlju
    var i = 0;  //promenljiva za for petlju
    var j = 0;  //promenljiva za for petlju
    var lastelem = level - 1; //posljednji element
    var numberOf = level * level - 1;  //broj polja sa brojem 
    var cont = $("<div></div>");
    var matrix = [];  //neslozena matrica
    var idealmatrix = [];  //slozena matrica

    function container() {        //funkcija za pravljenje prostora za polja
        width = 420;
        height = width;
        $("#page").append(cont);
        cont.width(width + (level));
        cont.height(height + (level));
        cont.addClass("container");
    }
    container();

    function piecemaking() {      //funkcija za popunjavanje i postavljanje polja
        piecew = width / level;
        pieceh = height / level;
        for (j = 0; j < level; j++) {   //definisanje niza nizova (    matrix (niz1[], niz2[], niz[3].. . niz(level-1))     )
            matrix.push([]);
        }
        for (i = 0; i < numberOf; i++) {        //dodavanje vrednost u niz1 niz2 i niz3 redom 
            var piece = $("<div>" + randomsol[i] + "</div>");
            cont.append(piece);
            piece.addClass("piece");
            piece.width(piecew);
            piece.height(pieceh);
            $(".piece").css("line-height", pieceh + "px");
            $(".piece").css("font-size", Math.floor(pieceh / 2) + "px");
            col = i % level;
            row = Math.floor(i / level);
            matrix[row].push(randomsol[i]);
            position(piece, col, row, true);   
        }
        matrix[lastelem].push(0);
    }
    piecemaking();

  
    $(document).on('click', '.piece', function movingclick(object) {  //funkcija koja uzima vrednost unutar kliknutog polja i po njoj nalazi poziciju koju prolsedjuje u funkciju za pomeranje

        var piece = $(object.currentTarget);
        var value = parseInt(piece.text());   // uzima vrednost kliknutog polja (object)
        outerloop:
            for (y = 0; y < level; y++) {
                for (x = 0; x < level; x++) {
                    if (matrix[y][x] == value) {
                        console.log(matrix[y][x]);
                        break outerloop;
                    }
                }
            }
        moving(piece, x, y);

        idealmatrix = makingidealmatrix();
        var k = 0;
        var p = 0;
        var br = 0;
        loop:
            for (k = 0; k < level; k++) {
                for (p = 0; p < level; p++) {
                    if (matrix[k][p] == idealmatrix[k][p]) {
                        br++;

                        if (br == (level * level)) {
                            console.log("cela je slozena");
                            $(".piece").css("background-color", "green");
                            $("#" + level + "").css("background-color", "gray");
                        }
                    } else {
                        break loop;
                    }

                }
            }
    });

    function position(piece, col, row, animation) {    //funkcija koja pozicionira polja u odnosu na margine
        var l = col * piecew;  // od leve margine
        var t = row * pieceh;   //od gornje margine
        if (animation == false) {
            piece.css("top", t);
            piece.css("left", l);
        } else {
            piece.animate({
                left: l,
                top: t
            }, 200);
        }
    }

    function moving(piece, col, row) {        //funkcija koja pomera polja u zavisnosti od toga gde je prazno u odnosu na kliknuto polje
        var xmove = 0;          //x i y pomeraji
        var ymove = 0;
        if (col > 0 && matrix[row][col - 1] == 0) {     
            xmove = -1;
        } else if (col < level - 1 && matrix[row][col + 1] == 0) {
            xmove = 1;
        } else if (row > 0 && matrix[row - 1][col] == 0) {
            ymove = -1;
        } else if (row < level - 1 && matrix[row + 1][col] == 0) {
            ymove = 1;
        } else {
            return;
        }
        var value = matrix[row][col];
        matrix[row + ymove][col + xmove] = value;
        matrix[row][col] = 0;
        position(piece, col + xmove, row + ymove, true);

    }


    function makingidealmatrix() {    //funkcija koja definise dobro poredjanu matricu radi uporedjivanja 
        for (var j = 0; j < level; j++) {
            idealmatrix.push([]);
        }
        for (var i = 0; i < numberOf; i++) {
            var x = Math.floor(i / level);
            idealmatrix[x].push(i + 1);
        }
        idealmatrix[level - 1].push(0);
        return idealmatrix;
    }
}
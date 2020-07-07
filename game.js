function game(level) { // u zavisnosti od kliknutog div-a, dobija se vrednost evel promenljive (3/4/5)
    $("#page").empty();
    var sol1 = [],
        sol2 = [],
        sol3 = [];
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
    var randomsol = solpicker[Math.floor(Math.random() * solpicker.length)];

    var width = 0;
    var height = 0;
    var piecew = 0;
    var pieceh = 0;
    var col = 0;
    var row = 0;
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var lastelem = level - 1;
    var numberOf = level * level - 1;
    var cont = $("<div></div>");
    var matrix = [];
    var idealmatrix = [];

    function container() {
        width = 420;
        height = width;
        $("#page").append(cont);
        cont.width(width + (level));
        cont.height(height + (level));
        cont.addClass("container");
    }
    container();

    function piecemaking() {
        piecew = width / level;
        pieceh = height / level;
        for (j = 0; j < level; j++) {
            matrix.push([]);
        }
        for (i = 0; i < numberOf; i++) {
            var piece = $("<div>" + randomsol[i] + "</div>");
            cont.append(piece);
            piece.addClass("piece");
            piece.width(piecew);
            piece.height(pieceh);
            $(".piece").css("line-height", pieceh + "px");
            $(".piece").css("font-size", Math.floor(pieceh / 2) + "px");
            col = i % level;
            row = Math.floor(i / level);
            console.log(col + " " + row);
            matrix[row].push(randomsol[i]);
            position(piece, col, row, true);
        }
        matrix[lastelem].push(0);
    }
    piecemaking();
    console.log(matrix);
    $(document).on('click', '.piece', function movingclick(object) {

        var piece = $(object.currentTarget);
        var value = parseInt(piece.text());
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

    function position(piece, col, row, animation) {
        var l = col * piecew;
        var t = row * pieceh;
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

    function moving(piece, col, row) {
        var xmove = 0;
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


    function makingidealmatrix() {
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
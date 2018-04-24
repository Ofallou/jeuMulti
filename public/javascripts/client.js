
$(function () {


    const pseudo = $('input').val();
    const socket = io('//localhost:3000');
    let playerScore = {

        pseudo: "",
        score: 0,

    };

    $('.final').hide();
    socket.on("welcome", function (data) {
        $('.welcome').html(data.welcome);
        console.log(data.welcome);
        $('.waitplayer').html("En attente de joueur !!");
    });

    //On termine je jeu si un des joueurs quitte
    $('.left').on('click', function () {
        socket.emit('game over');
    });

    socket.on("game over", function () {
        $('.de').hide();

    });


    socket.emit('pseudo', pseudo);
    $('.de').hide();


    var tab = document.createElement('div');
    tab.className = "panel panel-default";
    tab.style.display = "none";
    tab.innerHTML = "";
    document.body.appendChild(tab);


    var otherplayer = "";

    socket.on("on", function (data) {

        //console.log(data.joueur);

        if (data.gamers.length > 1) {

            $('.de').show();
            $('.waitplayer').html(data.message);
            //
        } else {


        }

        for (var i = 0; i < data.gamers.length; i++) {
            if (data.gamers[i][0].pseudo !== pseudo) {
                var player2 = document.createElement('div');
                player2.className = "otherplayer";
                player2.innerHTML = data.gamers[i][0].pseudo;
                otherplayer = data.gamers[i][0].pseudo;

                var avatar2 = document.createElement('img');
                avatar2.src = "/images/" + data.gamers[i][0].avatar + ".png";
                player2.appendChild(avatar2);
                document.body.appendChild(player2)
            }
        }


    });


    $('.de').on('click', function () {


        console.log(pseudo + " VS " + otherplayer);


        $('.waitplayer').html("");
        const chiffre = Math.round(Math.random() * (0 + 20) - 0);
        if (pseudo) {
            $('.de').hide();
            $('.wait').html('on attend son tour..!!');


        }

        socket.emit('chiffre', {pseudo: pseudo, chiffre: chiffre});
    });


    var score = 0;
    socket.on('carte', function (data) {

        if (data.partie < 21) {
            console.log(data.partie);

            $('.manche').html();
            if (data.data.pseudo === pseudo) {
                $('.pl1').html(data.data.chiffre);

            } else {

                $('.pl2').html(data.data.chiffre);
            }

            if (data.message.includes(pseudo)) {
                score = score + 2;

                $('.score').html(score + " points");
                playerScore.pseudo = pseudo;
                playerScore.score = score;

                socket.emit('score', playerScore)
            }
            if (data.message.includes("waiting")) {
            }

            $('.result').html(data.message);

            if (data.message.includes("gagne") || data.message.includes("gagnant")) {
                $('.de').show();
                $('.wait').html('');
            }


            // console.log(playerScore)


        } else {

            $('.de').hide();
            $('.wait').html('Manche terminée!!');
            $('.result').hide();
            $('.final').show();



        }

        socket.on('scores', function (data) {

            console.log(score + " ***** " + data.score);

            $('.of').html(data.score + " points");


            if (score > data.score) {

                $('.final').html("Le gagnant est " + pseudo + " avec un nombre de poins de " + score)

            } else if (score < data.score) {

                $('.final').html("Le gagnant est " + otherplayer + " avec un nombre de poins de " + data.score)

            } else if (score === data.score) {


                $('.final').html("Match null " + otherplayer + " " + data.score + "<br>" +
                    pseudo + " " + score
                )


            }


        })





    })


});





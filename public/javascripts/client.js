$(function () {


    const pseudo = $('input').val();
    const socket = io('//localhost:3000');


    socket.on("welcome", function (data) {
        $('.welcome').html(data.welcome);
        console.log(data.welcome);
    });

    socket.emit('pseudo', pseudo);

    socket.on("on", function (data) {
        console.log(data.joueur);
        for (var i = 0; i < data.joueur.length; i++) {
            if (data.joueur[i] !== pseudo) {
                var player2 = document.createElement('div');
                player2.className = "otherplayer";
                player2.innerHTML = data.joueur[i];
                document.body.appendChild(player2)

            }
        }

    });


    $('.de').on('click', function () {

        const chiffre = Math.round(Math.random() * (0 + 20) - 0);

        socket.emit('chiffre', {pseudo: pseudo, chiffre: chiffre});



    });

    var score = 0;

    socket.on('carte', function (data) {

        console.log("kikikkk " + data.data.chiffre);
        console.log(data.message);
        if (data.data.pseudo === pseudo) {
            $('.pl1').html(data.data.chiffre);


        } else {

            $('.pl2').html(data.data.chiffre);
        }

        if (data.message.includes(pseudo)) {
            score = score + 2;
            $('.score').html(score);


        }


        $('.result').html(data.message)


    })


});





$(function () {


    const pseudo = $('input').val();
    const socket = io('//localhost:3000');
    socket.on("welcome", function (data) {
        $('.welcome').html(data.welcome);
        console.log(data.welcome);
    });
    socket.emit('pseudo', pseudo);
    socket.on("onlinePlayer", function (data) {
        console.log(data.playerOnline);
        /*
                data.playerOnline.forEach(element => {
                    let div=document.createElement('div');

                    if(div.innerHTML===element.pseudo){

                        console.log(true);

                    }else {

                        div.innerHTML=element.pseudo;
                        let img=document.createElement('img');
                        img.src="/images/" + element.avatar + ".png";
                        document.body.appendChild(img);
                        document.body.appendChild(div);

                    }


                });
        */
        let sss = JSON.stringify(joueurs);
        console.log(sss)

    });

    $('.btn.btn-primary').on('click', function () {

        const chiffre = Math.round(Math.random() * (0 + 20) - 0);
        socket.emit('chiffre', chiffre);
    });
    socket.on('chiffre joueur 1', function (data) {
        //console.log(data)
        $('.chiffreJouerplayer1').html(data);


    })


});





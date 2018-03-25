const playerFactory = (function () {
    const PlayerContructor = function (user, score, idSocket) {
        //propriétées
        this.user = user;
        this.score = score;
        this.idSocket = idSocket;
    };


    //Methodes


    return function (_user, _score, _idSocket) {
        return new PlayerContructor(_user, _score, _idSocket);
    };

}());
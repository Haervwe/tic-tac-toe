
//game object, (using reveal module pattern)

const BoardFactory = (() => {
    var board = document.getElementById("board");
    var game = [];
    var players = [];
    var currentPlayer = 2;
    var gameType;
    var mark = "";
    //player factory object

    const PlayerFactory = (name,type) =>{
        let mark;
        let score = 0;
        if (players.length > 1){
            return;
        }
        if (players.length == 0 ){
            mark = "X";
        } else {
            mark = "O";
        }
        if (name == ""){
            name = `Player ${players.length+1}`;
        }
        function plusScore (){
            this.score += 1;
        }
        return {
            name,
            type,
            score,
            mark,
            plusScore,
        }
    }

    //game board factory object 

    const SquareFactory = (id) =>{
        
        function render(a) {
            let current = document.getElementById(`square${a.id}`);
            if (current == null) {
                let square = document.createElement("div");
                square.id = `square${id}`;
                square.className = "square";
                square.innerText = "";
                a.mark = "";
                square.onclick = function (){a.setMark()};
                board.appendChild(square);
                    
            } else {
                current.className = `square ${a.mark}`;
                board.className = `player${currentPlayer}`;
            }
        }   

        function setMark (){
            let player1score = document.getElementById("player1score");
            let player2score = document.getElementById("player2score");
            if (this.mark == ""){
                if  (currentPlayer == 2){
                    render(this)
                } else {
                    this.mark = players[currentPlayer].mark;
                    if (game.length == 9){
                        if ((gameType == "ai") && (checkWinner(game,currentPlayer)== 8)){
                            currentPlayer = 1;
                            let index = miniMax(game,0,true).index;
                            game[index].mark = "O";
                            currentPlayer = 0;
                            render(game[index]);
                        } else {
                            if (currentPlayer == 0){
                                currentPlayer = 1;
                            } else {
                                currentPlayer = 0;
                            }
                        }
                        if (checkWinner(game,currentPlayer)==-1){
                            players[1].plusScore();
                            player2score.innerText = `${players[1].score}`;
                            resetGame();
                        } else if (checkWinner(game,currentPlayer)==1){
                            players[0].plusScore();
                            player1score.innerText = `${players[0].score}`;
                            resetGame();
                        }else if (checkWinner(game,currentPlayer)==0){
                            resetGame();
                        }
                    }
                    render(this);
                }
            }
        }
        return {
        id,
        mark,
        setMark,
        };
    }

    //Game  Object Private Methods.


    function populateBoard (){
        for (let i = 0; i < 9; i++){
            game.push(SquareFactory(i));
            game[i].setMark();
        };
    }

    function resetGame () {
        game = [];
        board.innerHTML = "";
        populateBoard ();
        currentPlayer = 0;
        board.className = `player${currentPlayer}`;
    };

    //miniMax algorith function for ai play

    function miniMax (gameTemp,depth, isMaximizer){

        var gameCopy = [{mark: gameTemp[0].mark}, {mark: gameTemp[1].mark}, {mark: gameTemp[2].mark}, {mark:  gameTemp[3].mark}, {mark:  gameTemp[4].mark}, {mark:  gameTemp[5].mark}, {mark:  gameTemp[6].mark}, {mark:  gameTemp[7].mark}, {mark:  gameTemp[8].mark},];
        let current;
        let moves = [];

        if (isMaximizer == true){
            current = 0;
        } else if (isMaximizer == false){
            current = 1;
        }
        if (checkWinner(gameCopy, current) == 1){
            return {value: 1/depth};
        }
        if (checkWinner(gameCopy, current) == -1){
            return {value: -1/depth};
        }
        if (checkWinner(gameCopy, current) == 0){
            return {value: 0};
        }
        
        if (isMaximizer == true){
            for (let i = 0; i < 9; i++){
                if (gameCopy[i].mark == ""){
                    gameCopy[i].mark = "O";
                    let move = miniMax(gameCopy, depth +1, false);
                    gameCopy[i].mark = "";
                    moves.push({index: i, value: move.value});
                }
            }
        }

        if(isMaximizer == false){
            for (let i = 0; i < 9; i++){
                if (gameCopy[i].mark == ""){
                    gameCopy[i].mark = "X";
                    let move = miniMax(gameCopy, depth +1,true);
                    gameCopy[i].mark = "";
                    moves.push({index: i, value: move.value});
                }
            }
        }
        
        if (isMaximizer == true){
            let index = 0;
            let value = -10;
            for (let i = 0 ; i < moves.length; i++){
                if  (moves[i].value > value){
                    index = moves[i].index;
                    value = moves[i].value;
                }
            }
            if (depth == 0){
                console.log(moves);
            }
            return {index: index ,value: value};
        }
        if (isMaximizer == false){
            let index = 0;
            let value = 10;
            for (let i = 0 ; i < moves.length; i++){
                if  (moves[i].value < value){
                    index = moves[i].index;
                    value = moves[i].value;
                }
            }
            return {index: index ,value: value};
        }
    }

    function checkWinner (game,currentP) {

        //checks if theres a winner

        if ((game[0].mark === game[1].mark)&&(game[1].mark === game[2].mark)&&(game[0].mark !== "")||(game[3].mark === game[4].mark)&&(game[4].mark === game[5].mark)&&(game[3].mark !== "")||(game[6].mark === game[7].mark)&&(game[7].mark === game[8].mark)&&(game[6].mark !== "")||(game[0].mark === game[4].mark)&&(game[4].mark === game[8].mark)&&(game[0].mark !== "")||(game[2].mark === game[4].mark)&&(game[4].mark === game[6].mark)&&(game[2].mark !== "")||(game[0].mark === game[3].mark)&&(game[3].mark === game[6].mark)&&(game[0].mark !== "")||(game[1].mark === game[4].mark)&&(game[4].mark === game[7].mark)&&(game[1].mark !== "")||(game[2].mark === game[5].mark)&&(game[5].mark === game[8].mark)&&(game[2].mark !== "")) {
            if (currentP == 0) {
                return -1;
            }
            if (currentP == 1){
                return 1;
            }
        }

        //checks for a tie

        if ((game[0].mark !== "")&&(game[1].mark !== "")&&(game[2].mark !== "")&&(game[3].mark !== "")&&(game[4].mark !== "")&&(game[5].mark !== "")&&(game[6].mark !== "")&&(game[7].mark !== "")&&(game[8].mark !== "")){
            return 0;
        }
        return 8;
    }

    //Game  Object Pulbic Methods.

    
    function setGameType (type){
        if (type == "ai"){
            gameType = "ai";
        } else {
            gameType = "twoPlayers";
        }
    }

    function newPlayers (){
        let form = document.getElementById("playerSelection");
        let player1name = document.getElementById("player1name");
        let player2name = document.getElementById("player2name");
        if (gameType == "ai"){
            players.push(PlayerFactory(`${form.player.value}`,"human"));
            players.push(PlayerFactory(`AI`,"ai"))
            
        } else {
            players.push(PlayerFactory(`${form.player1.value}`,"human"));
            players.push(PlayerFactory(`${form.player2.value}`,"human"));
        }
        player1name.innerText = `${players[0].name}`;
        player2name.innerText = `${players[1].name}`;
    }

    //game first initialization
    
    resetGame();

    return {
        setGameType,
        newPlayers,
    }

})();


//functions to change visivility of the player selection menu.

function displayTwoPlayers () {
    const gameType = document.querySelector(".gameType");
    const twoPNames = document.querySelector(".twoPNames");
    gameType.style.display = "none";
    twoPNames.style.display = "grid";
    BoardFactory.setGameType("two");
}

function displayOnePlayer () {
    const gameType = document.querySelector(".gameType");
    const onePName = document.querySelector(".onePName");
    gameType.style.display = "none";
    onePName.style.display = "grid"
    BoardFactory.setGameType("ai");
}

function displayGame () {
    const form = document.getElementById("playerSelection");
    const gameBoard = document.querySelector(".gameBoard");
    const onePName = document.querySelector(".onePName");
    const twoPNames = document.querySelector(".twoPNames");
    gameBoard.style.display = "Grid";
    onePName.style.display = "none";
    twoPNames.style.display = "none";
    form.style.display = "none";
    BoardFactory.newPlayers();
}

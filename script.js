
//game object, (using reveal module pattern)

const BoardFactory = (() => {
    var board = document.getElementById("board");
    var game = [];
    var players = [];
    var currentPlayer = 2;
    var gameType;

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
            score++;
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
                current.innerText = `${a.mark}`;
            }
        }   

        function setMark (){
            console.log(currentPlayer);
            if (this.mark == ""){
                if  (currentPlayer == 2){
                    render(this)
                } else {
                    this.mark = players[currentPlayer].mark;
                    render(this);
                    if (game.length == 9){
                        checkWinner();
                        if (currentPlayer == 0){
                            currentPlayer = 1;
                        } else {
                            currentPlayer = 0;
                        }
                    }
                }
            }
        }
        return {
        id,
        mark: "",
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
    };

    //Game  Object Pulbic Methods.

    function checkWinner () {
        if ((game[0].mark === game[1].mark)&&(game[1].mark === game[2].mark)&&(game[0].mark !== "")||(game[3].mark === game[4].mark)&&(game[4].mark === game[5].mark)&&(game[3].mark !== "")||(game[6].mark === game[7].mark)&&(game[7].mark === game[8].mark)&&(game[6].mark !== "")||(game[0].mark === game[4].mark)&&(game[4].mark === game[8].mark)&&(game[0].mark !== "")||(game[2].mark === game[4].mark)&&(game[4].mark === game[6].mark)&&(game[2].mark !== "")||(game[0].mark === game[3].mark)&&(game[3].mark === game[6].mark)&&(game[0].mark !== "")||(game[1].mark === game[4].mark)&&(game[4].mark === game[7].mark)&&(game[1].mark !== "")||(game[2].mark === game[5].mark)&&(game[5].mark === game[8].mark)&&(game[2].mark !== "")) {
            players[currentPlayer].plusScore();
            console.log(players[currentPlayer]);
            resetGame();
        }
        if ((game[0].mark !== "")&&(game[1].mark !== "")&&(game[2].mark !== "")&&(game[3].mark !== "")&&(game[4].mark !== "")&&(game[5].mark !== "")&&(game[6].mark !== "")&&(game[7].mark !== "")&&(game[8].mark !== "")){
            console.log("no winner");
            resetGame();
        }
    }
    
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
    const gameBoard = document.querySelector(".gameBoard");
    const onePName = document.querySelector(".onePName");
    const twoPNames = document.querySelector(".twoPNames");
    gameBoard.style.display = "Grid";
    onePName.style.display = "none"
    twoPNames.style.display = "none"
    BoardFactory.newPlayers();
}

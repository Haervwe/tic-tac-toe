
//game object, (using reveal module pattern)

const BoardFactory = (() => {
    var board = document.getElementById("board");
    var game = [];
    var players = [];
    var currentPlayer;
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
            if (this.mark == ""){
                if  (currentPlayer == null){
                    render(this)
                } else {
                    this.mark = currentPlayer.mark;
                    if (currentPlayer == players[0]){
                        currentPlayer = players[1];
                    } else {
                        currentPlayer = players[0];
                    }
                    render(this);
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
            currentPlayer = players[0];
            
        } else {
            players.push(PlayerFactory(`${form.player1.value}`,"human"));
            players.push(PlayerFactory(`${form.player2.value}`,"human"));
            currentPlayer = players[0];
        }
        player1name.innerText = `${players[0].name}`;
        player2name.innerText = `${players[1].name}`;
    }

    function resetGame () {
        game = [];
        board.innerHTML = "";
        populateBoard ();
    }

    return {
        setGameType,
        newPlayers,
        resetGame,
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

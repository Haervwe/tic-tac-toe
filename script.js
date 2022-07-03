
var board = document.getElementById("board");


const BoardFactory = (() => {
    var game = [];
    var players = []
    var currentPlayer;
    const PlayerFactory = (name, type, mark) =>{
        return {
            name,
            type,
            mark,
        }
    }

    players.push(PlayerFactory("test","human","X"));
    players.push(PlayerFactory("test2","human","O"));
    currentPlayer = players[0];
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
                this.mark = currentPlayer.mark;
                if (currentPlayer == players[0]){
                    currentPlayer = players[1];
                } else {
                    currentPlayer = players[0];
                }
                render(this);
            }
        }
        return {
        id,
        mark: "",
        setMark,
        };
    }

    for (let i = 0; i < 9; i++){
        game.push(SquareFactory(i));
        game[i].setMark();
    };



    return {
        game,
    }

})();



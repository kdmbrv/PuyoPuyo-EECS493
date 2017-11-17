var PuyoPuyo = PuyoPuyo || {};



PuyoPuyo.InGameState = {
    create: function() {
        console.log("INGAME");
        this.game.stage.backgroundColor = "#FFFFFF";
        this.player1Board = new PlayerBoard(this.game, this);
        this.player1Board.print();
        this.player1Board.create();
    },
    
    update: function() {
        this.player1Board.update();    
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
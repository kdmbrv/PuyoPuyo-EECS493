var PuyoPuyo = PuyoPuyo || {};



PuyoPuyo.InGameState = {
    create: function() {
        console.log("INGAME");
        this.game.stage.backgroundColor = "#FFFFFF";
        this.player1Board = new PlayerBoard(this.game, this);
        this.player1Board.create();
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
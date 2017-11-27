var PuyoPuyo = PuyoPuyo || {};



PuyoPuyo.InGameState = {
    create: function() {
        console.log("INGAME");
        this.game.stage.backgroundColor = "#bbc1cc";
        //var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        //text = this.game.add.text(0, 0, "inspect with console to play", style);
        //Eventually will pass in x and y placement coords as well as size
        //Can now pass in the controls so making a second board should be pretty easy
        this.player1Board = new PlayerBoard(this.game, this, 20, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.N, Phaser.Keyboard.M);
        this.player2Board = new PlayerBoard(this.game, this, 426, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.S, Phaser.Keyboard.C, Phaser.Keyboard.V);
        this.player1Board.print();
        this.player1Board.create();
        this.player2Board.create();
    },
    
    update: function() {
        this.player1Board.update(); 
        this.player2Board.update();
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
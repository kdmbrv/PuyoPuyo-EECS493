var PuyoPuyo = PuyoPuyo || {};



PuyoPuyo.InGameState = {
    create: function() {
        console.log("INGAME");
        this.backgroundWall = this.game.add.tileSprite(0,0,this.game.width, this.game.height, 'brick_wall');
        //var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        //text = this.game.add.text(0, 0, "inspect with console to play", style);
        //Eventually will pass in x and y placement coords as well as size
        //Can now pass in the controls so making a second board should be pretty easy
        this.player1Board = new PlayerBoard(this.game, this, 20, this.game.global['player1LeftKey'], this.game.global['player1RightKey'], this.game.global['player1DownKey'], this.game.global['player1RotateLKey'], this.game.global['player1RotateRKey']);
        this.player2Board = new PlayerBoard(this.game, this, 426, this.game.global['player2LeftKey'], this.game.global['player2RightKey'], this.game.global['player2DownKey'], this.game.global['player2RotateLKey'], this.game.global['player2RotateRKey']);
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
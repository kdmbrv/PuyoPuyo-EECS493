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
        
        // Next blobs
        this.next_text = this.game.add.text(280, 20, "NEXT");
        this.next_text.anchor.setTo(0);
        this.next_text.font = 'Chewy';
        this.next_text.fontSize = 45;
        this.next_text.fill = '#55ff37';
        this.next_text.stroke = '#000000';
        this.next_text.strokeThickness = 5;
        
        this.player2Next = this.game.add.sprite(250, 70, 'brick_wall_dark');
        this.player2Next.width = 50;
        this.player2Next.height = 80;
        this.player2Text = this.game.add.text(275, 85, "<P2");
        this.player2Text.anchor.setTo(0.5);
        this.player2Text.font = 'Press Start 2P';
        this.player2Text.fontSize = 12;
        this.player2Text.fill = '#ffffff';
        
        this.player1Next = this.game.add.sprite(350, 70, 'brick_wall_dark');
        this.player1Next.width = 50;
        this.player1Next.height = 80;
        this.player1Text = this.game.add.text(376, 85, "P1>");
        this.player1Text.anchor.setTo(0.5);
        this.player1Text.font = 'Press Start 2P';
        this.player1Text.fontSize = 12;
        this.player1Text.fill = '#ffffff';
        
        // Score display
        this.score_text = this.game.add.text(280, 300, "SCORE");
        this.score_text.anchor.setTo(0);
        this.score_text.font = 'Chewy';
        this.score_text.fontSize = 45;
        this.score_text.fill = '#55ff37';
        this.score_text.stroke = '#000000';
        this.score_text.strokeThickness = 5;
        
        this.player1Score = this.game.add.text(260, 360, "0");
        this.player1Score.anchor.setTo(0);
        this.player1Score.font = 'Press Start 2P';
        this.player1Score.fill = '#364aff';
        this.player1Score.fontSize = 20;
        this.player1Score.stroke = '#000000';
        this.player1Score.strokeThickness = 3;
        
        this.player2Score = this.game.add.text(230, 390, "0");
        this.player2Score.anchor.setTo(0);
        this.player2Score.font = 'Press Start 2P';
        this.player2Score.fill = '#f44242';
        this.player2Score.fontSize = 20;
        this.player2Score.stroke = '#000000';
        this.player2Score.strokeThickness = 3;
    },
    
    update: function() {
        this.player1Board.update(); 
        this.player2Board.update();
        this.updateNextBlobs();
        this.updateScore();
    },
    
    updateNextBlobs() {
        this.player2NextBlobA = new testBlob(260, 90, this.player1Board.nextBlob1Color, this.game, 0, 0);
        this.player2NextBlobA.create(260, 90);
        this.player2NextBlobB = new testBlob(260, 120, this.player1Board.nextBlob2Color, this.game, 0, 0);
        this.player2NextBlobB.create(260, 120);
        
        this.player1NextBlobA = new testBlob(360, 90, this.player2Board.nextBlob1Color, this.game, 0, 0);
        this.player1NextBlobA.create(360, 90);
        this.player1NextBlobB = new testBlob(360, 120, this.player2Board.nextBlob2Color, this.game, 0, 0);
        this.player1NextBlobB.create(360, 120);
    },
    
    updateScore() {
        // Player 1 score
        var P1 = "0000000" + this.player1Board.score;
        this.player1Score.setText(P1.substr(0, 8));
        
        // Player 2 score
        var P2 = "0000000" + this.player2Board.score;
        this.player2Score.setText(P2.substr(0, 8));
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
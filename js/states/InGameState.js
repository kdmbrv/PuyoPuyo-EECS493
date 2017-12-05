var PuyoPuyo = PuyoPuyo || {};



PuyoPuyo.InGameState = {
    create: function() {
        console.log("INGAME");
        this.inGameBackgroundPic = this.game.add.sprite(0, 0, 'inGameBackgroundPic');
        this.inGameBackgroundPic.height = this.game.height;
        this.inGameBackgroundPic.width = this.game.width;
        // this.backgroundWall = this.game.add.tileSprite(0,0,this.game.width, this.game.height, 'brick_wall');
        //var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        //text = this.game.add.text(0, 0, "inspect with console to play", style);
        //Eventually will pass in x and y placement coords as well as size
        //Can now pass in the controls so making a second board should be pretty easy
        this.player1Board = new PlayerBoard(this.game, this, 20, this.game.global['player1LeftKey'], this.game.global['player1RightKey'], this.game.global['player1DownKey'], this.game.global['player1RotateLKey'], this.game.global['player1RotateRKey']);
        this.player2Board = new PlayerBoard(this.game, this, 426, this.game.global['player2LeftKey'], this.game.global['player2RightKey'], this.game.global['player2DownKey'], this.game.global['player2RotateLKey'], this.game.global['player2RotateRKey']);
        this.player1Board.print();
        this.player1Board.create();
        this.player2Board.create();
        
        this.gamePlaying = true;
        
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
        this.player2Next.height = 90;
        this.player2Text = this.game.add.text(275, 85, "<P2");
        this.player2Text.anchor.setTo(0.5);
        this.player2Text.font = 'Press Start 2P';
        this.player2Text.fontSize = 12;
        this.player2Text.fill = '#ffffff';
        
        this.player1Next = this.game.add.sprite(350, 70, 'brick_wall_dark');
        this.player1Next.width = 50;
        this.player1Next.height = 90;
        this.player1Text = this.game.add.text(376, 85, "P1>");
        this.player1Text.anchor.setTo(0.5);
        this.player1Text.font = 'Press Start 2P';
        this.player1Text.fontSize = 12;
        this.player1Text.fill = '#ffffff';
        this.updateNextBlobs();
        
        // Score display
        this.score_text = this.game.add.text(280, 300, "SCORE");
        this.score_text.anchor.setTo(0);
        this.score_text.font = 'Chewy';
        this.score_text.fontSize = 45;
        this.score_text.fill = '#55ff37';
        this.score_text.stroke = '#000000';
        this.score_text.strokeThickness = 5;
        
        this.player1Score = this.game.add.text(230, 390, "0");
        this.player1Score.anchor.setTo(0);
        this.player1Score.font = 'Press Start 2P';
        this.player1Score.fill = '#364aff';
        this.player1Score.fontSize = 20;
        this.player1Score.stroke = '#000000';
        this.player1Score.strokeThickness = 3;
        
        this.player2Score = this.game.add.text(260, 360, "0");
        this.player2Score.anchor.setTo(0);
        this.player2Score.font = 'Press Start 2P';
        this.player2Score.fill = '#f44242';
        this.player2Score.fontSize = 20;
        this.player2Score.stroke = '#000000';
        this.player2Score.strokeThickness = 3;
        this.updateScore();
    },
    
    update: function() {
        if (!this.gamePlaying) {
            return;
        }
        if (!this.player1Board.gameOver && !this.player2Board.gameOver) {
            this.player1Board.update(); 
            this.player2Board.update();
        }
        else {
            this.gamePlaying = false;
            this.endGame();
        }
    },
    
    updateNextBlobs() {
        if (!this.gamePlaying) {
            return;
        }
        
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
        this.player1Score.setText(P1.substr(P1.length-8));
        
        // Player 2 score
        var P2 = "0000000" + this.player2Board.score;
        this.player2Score.setText(P2.substr(P2.length-8));
    },
    
    endGame() {
        // Award non-losing points and update score one last time
        if (this.player1Board.gameOver) {
            this.player2Board.score += 20000;
        }
        else if (this.player2Board.gameOver) {
            this.player1Board.score += 20000;
        }
        this.updateScore();
        
        // Set game over for both players
        this.player1Board.gameOver = true;
        this.player2Board.gameOver = true;
        
        // Dim game screen
        this.dimmer = this.game.add.sprite(0, 0, 'black');
        this.dimmer.anchor.setTo(0);
        this.dimmer.height = this.game.height;
        this.dimmer.width = this.game.width;
        this.dimmer.alpha = 0.7;
        this.dimmer.z = 97;
        
        // Show game over screen
        this.gameover_background = this.game.add.sprite(0, 0, 'menu');
        this.gameover_background.x = this.game.world.centerX;
        this.gameover_background.y = this.game.world.centerY;
        this.gameover_background.anchor.setTo(0.5);
        this.gameover_background.height = this.game.height / 3;
        this.gameover_background.width = this.game.width / 3;
        this.gameover_background.z = 98;
        
        this.reset_option = this.game.add.text(0, 0, 'RESET');
        this.reset_option.x = this.gameover_background.x;
        this.reset_option.y = this.gameover_background.y - 20;
        this.reset_option.anchor.setTo(0.5);
        this.reset_option.font = 'Press Start 2P';
        this.reset_option.fill = '#55ff37';
        this.reset_option.fontSize = 20;
        this.reset_option.stroke = "#000000";
        this.reset_option.strokeThickness = 3;
        this.reset_option.inputEnabled = true;
        this.reset_option.input.useHandCursor = true;
        this.reset_option.events.onInputDown.add(this.reset);
        this.reset_option = 99;
        
        this.back_option = this.game.add.text(0, 0, 'BACK');
        this.back_option.x = this.gameover_background.x;
        this.back_option.y = this.gameover_background.y + 30;
        this.back_option.anchor.setTo(0.5);
        this.back_option.font = 'Press Start 2P';
        this.back_option.fill = '#790ea3';
        this.back_option.fontSize = 20;
        this.back_option.stroke = "#000000";
        this.back_option.strokeThickness = 3;
        this.back_option.inputEnabled = true;
        this.back_option.input.useHandCursor = true;
        this.back_option.inputEnabled = true;
        this.back_option.events.onInputDown.add(this.goToMainMenu);
        this.back_option = 99;
        
        
        this.gameover_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 140, 'GAME OVER');
        this.gameover_text.anchor.setTo(0.5);
        this.gameover_text.font = 'Chewy';
        // Color characters
        this.gameover_text.addColor('#f44242', 0);
        this.gameover_text.addColor('#fffb38', 1);
        this.gameover_text.addColor('#55ff37', 2);
        this.gameover_text.addColor('#0776ff', 3);
        this.gameover_text.addColor('#790ea3', 5);
        this.gameover_text.addColor('#f44242', 6);
        this.gameover_text.addColor('#fffb38', 7);
        this.gameover_text.addColor('#55ff37', 8);
        this.gameover_text.fontSize = 70;
        this.gameover_text.stroke = '#000000';
        this.gameover_text.strokeThickness = 5;
        this.gameover_text.z = 99;
        
        this.player1EndText = this.game.add.text(0, 0, "");
        this.player1EndText.x = 120;
        this.player1EndText.y = this.game.world.centerY;
        this.player1EndText.anchor.setTo(0.5);
        this.player1EndText.font = 'Press Start 2P';
        this.player1EndText.fontSize = 40;
        this.player1EndText.fill = '#364aff';
        this.player1EndText.stroke = '#ffffff';
        this.player1EndText.strokeThickness = 3;
        this.player1EndText.z = 99;
        
        this.player2EndText = this.game.add.text(0, 0, "");
        this.player2EndText.x = 520;
        this.player2EndText.y = this.game.world.centerY;
        this.player2EndText.anchor.setTo(0.5);
        this.player2EndText.font = 'Press Start 2P';
        this.player2EndText.fontSize = 40;
        this.player2EndText.fill = '#f44242';
        this.player2EndText.stroke = '#ffffff';
        this.player2EndText.strokeThickness = 3;
        this.player2EndText.z = 99;
        
        if (this.player1Board.score > this.player2Board.score) {
            this.player1EndText.setText("WIN");
            this.player2EndText.setText("LOSE");
        }
        else if (this.player2Board.score > this.player1Board.score) {
            this.player1EndText.setText("LOSE");
            this.player2EndText.setText("WIN");
        }
        else {
            this.player1EndText.setText("TIE");
            this.player2EndText.setText("TIE");
        }
    },
    
    reset() {
        this.PuyoPuyo.InGameState.game.state.start('InGameState');
    },
    
    goToMainMenu() {
        this.PuyoPuyo.InGameState.game.state.start('MainMenuState');
    }
};
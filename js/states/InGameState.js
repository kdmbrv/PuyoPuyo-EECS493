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
        this.player1Board = new PlayerBoard(this.game, this, this.game.width * 0.05, this.game.height * 0.05, this.game.width * 0.3, this.game.global['player1LeftKey'], this.game.global['player1RightKey'], this.game.global['player1DownKey'], this.game.global['player1RotateLKey'], this.game.global['player1RotateRKey'], true);
        this.player2Board = new PlayerBoard(this.game, this, this.game.width * 0.65, this.game.height * 0.05, this.game.width * 0.3, this.game.global['player2LeftKey'], this.game.global['player2RightKey'], this.game.global['player2DownKey'], this.game.global['player2RotateLKey'], this.game.global['player2RotateRKey'], false);
        this.player1Board.print();
        this.player1Board.create();
        this.player2Board.create();
        
        this.gamePlaying = true;
        
        // Next blobs
        this.next_text = this.game.add.text(this.game.world.centerX, this.game.height * 0.03, "NEXT");
        this.next_text.anchor.x = 0.5;
        this.next_text.font = 'Chewy';
        this.next_text.fontSize = (this.game.height * 0.1).toString() + 'px';
        this.next_text.fill = '#55ff37';
        this.next_text.stroke = '#000000';
        this.next_text.strokeThickness = 5;
        
        this.player2Next = this.game.add.sprite(this.game.width * 0.4, this.game.height * 0.2, 'wood');
        this.player2Next.width = this.game.width * 0.08;
        this.player2Next.height = this.player2Next.width * 1.8;
        this.player2Text = this.game.add.text(this.game.width * 0.4, this.game.height * 0.16, "<P1");
        this.player2Text.font = 'Press Start 2P';
        this.player2Text.fontSize = (this.game.height * 0.04).toString() + 'px';
        this.player2Text.fill = '#ffffff';
        this.player1Next = this.game.add.sprite(this.game.width * 0.52, this.game.height * 0.2, 'wood');
        this.player1Next.width = this.game.width * 0.08;
        this.player1Next.height = this.player2Next.width * 1.8;
        this.player1Text = this.game.add.text(this.game.width * 0.52, this.game.height * 0.16, "P2>");
        this.player1Text.font = 'Press Start 2P';
        this.player1Text.fontSize = (this.game.height * 0.04).toString() + 'px';
        this.player1Text.fill = '#ffffff';
        this.updateNextBlobs();
        
        // Score display
        this.score_text = this.game.add.text(this.game.world.centerX, this.game.height * 0.6, "SCORE");
        this.score_text.anchor.x = 0.5;
        this.score_text.font = 'Chewy';
        this.score_text.fontSize = (this.game.height * 0.1).toString() + 'px';
        this.score_text.fill = '#55ff37';
        this.score_text.stroke = '#000000';
        this.score_text.strokeThickness = 5;
        
        this.player1Score = this.game.add.text(this.game.width * 0.37, this.game.height * 0.77, "0");
        this.player1Score.anchor.setTo(0);
        this.player1Score.font = 'Press Start 2P';
        this.player1Score.fill = '#364aff';
        this.player1Score.fontSize = (this.game.height * 0.04).toString() + 'px';
        this.player1Score.stroke = '#000000';
        this.player1Score.strokeThickness = 3;
        
        this.player2Score = this.game.add.text(this.game.width * 0.41, this.game.height * 0.72, "0");
        this.player2Score.anchor.setTo(0);
        this.player2Score.font = 'Press Start 2P';
        this.player2Score.fill = '#f44242';
        this.player2Score.fontSize = (this.game.height * 0.04).toString() + 'px';
        this.player2Score.stroke = '#000000';
        this.player2Score.strokeThickness = 3;
        this.updateScore();
        
        this.pauseButton = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'pauseButton');
        this.pauseButton.anchor.setTo(.5);
        this.pauseButton.width = this.game.width * 0.15;
        this.pauseButton.height = this.game.height * 0.15;
        this.pauseButton.inputEnabled = true;
        this.pauseButton.input.useHandCursor = true;
        this.pauseButton.events.onInputDown.add(this.pause, this);
        
        this.pauseButtonText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+5, "PAUSE");
        this.pauseButtonText.anchor.setTo(.5);
        this.pauseButtonText.font = 'Chewy';
        this.pauseButtonText.fontSize = (this.game.height * 0.08).toString() + 'px';
        this.pauseButtonText.fill = '#55ff37';
        this.pauseButtonText.stroke = '#000000';
        this.pauseButtonText.strokeThickness = 5;
        
        this.pauseMenuBackground = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "menu");
        this.pauseMenuBackground.anchor.setTo(.5);
        this.pauseMenuBackground.width = this.game.width * 0.3;
        this.pauseMenuBackground.height = this.game.height * 0.7;
        this.pauseMenuBackground.visible = false;
        
        this.pauseMenuTitle = this.game.add.text(this.game.world.centerX, this.game.height * 0.3, "PAUSED");
        this.pauseMenuTitle.anchor.setTo(.5);
        this.pauseMenuTitle.font = 'Press Start 2P';
        this.pauseMenuTitle.fill = '#f44242';
        this.pauseMenuTitle.fontSize = (this.game.height * 0.055).toString() + 'px';
        this.pauseMenuTitle.stroke = '#000000';
        this.pauseMenuTitle.strokeThickness = 3;
        this.pauseMenuTitle.visible = false;
        
        this.resumeButton = this.game.add.sprite(this.game.world.centerX, this.game.height * 0.42, 'whiteButton');
        this.resumeButton.anchor.setTo(.5);
        this.resumeButton.visible = false;
        this.resumeButton.width = this.game.width * 0.22;
        this.resumeButton.height = this.game.height * 0.13;
        this.resumeButton.inputEnabled = true;
        this.resumeButton.input.useHandCursor = true;
        this.resumeButton.events.onInputDown.add(this.resume, this);
        //#485416
        
        this.resumeButtonText = this.game.add.text(this.game.world.centerX, this.game.height * 0.42, 'RESUME');
        this.resumeButtonText.anchor.setTo(.5);
        this.resumeButtonText.font = 'Chewy';
        this.resumeButtonText.fill = '#364aff';
        this.resumeButtonText.fontSize = (this.game.height * 0.09).toString() + 'px';
        this.resumeButtonText.stroke = '#000000';
        this.resumeButtonText.strokeThickness = 3;
        this.resumeButtonText.visible = false;
        
        this.resetButton = this.game.add.sprite(this.game.world.centerX, this.game.height * 0.55, 'whiteButton');
        this.resetButton.anchor.setTo(.5);
        this.resetButton.visible = false;
        this.resetButton.width = this.game.width * 0.22;
        this.resetButton.height = this.game.height * 0.13;
        this.resetButton.inputEnabled = true;
        this.resetButton.input.useHandCursor = true;
        this.resetButton.events.onInputDown.add(this.resetWhenPaused, this);
        
        
        this.resetButtonText = this.game.add.text(this.game.world.centerX, this.game.height * 0.55, 'RESET');
        this.resetButtonText.anchor.setTo(.5);
        this.resetButtonText.font = 'Chewy';
        this.resetButtonText.fill = '#364aff';
        this.resetButtonText.fontSize = (this.game.height * 0.09).toString() + 'px';
        this.resetButtonText.stroke = '#000000';
        this.resetButtonText.strokeThickness = 3;
        this.resetButtonText.visible = false;
        
        this.quitButton = this.game.add.sprite(this.game.world.centerX, this.game.height * 0.68, 'whiteButton');
        this.quitButton.anchor.setTo(.5);
        this.quitButton.visible = false;
        this.quitButton.width = this.game.width * 0.22;
        this.quitButton.height = this.game.height * 0.13;
        this.quitButton.inputEnabled = true;
        this.quitButton.input.useHandCursor = true;
        this.quitButton.events.onInputDown.add(this.quit, this);
        
        this.quitButtonText = this.game.add.text(this.game.world.centerX, this.game.height * 0.68, 'QUIT');
        this.quitButtonText.anchor.setTo(.5);
        this.quitButtonText.font = 'Chewy';
        this.quitButtonText.fill = '#364aff';
        this.quitButtonText.fontSize = (this.game.height * 0.09).toString() + 'px';
        this.quitButtonText.stroke = '#000000';
        this.quitButtonText.strokeThickness = 3;
        this.quitButtonText.visible = false;
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
        
        this.player2NextBlobA = new Puyo(260, 90, this.player1Board.nextBlob1Color, this.game, this.game.width * 0.07, this.game.width * 0.07);
        this.player2NextBlobA.create(this.game.width * 0.405, this.game.height * 0.2);
        this.player2NextBlobB = new Puyo(260, 120, this.player1Board.nextBlob2Color, this.game, this.game.width * 0.07, this.game.width * 0.07);
        this.player2NextBlobB.create(this.game.width * 0.405, this.game.height * 0.3);
        
        this.player1NextBlobA = new Puyo(360, 90, this.player2Board.nextBlob1Color, this.game, this.game.width * 0.07, this.game.width * 0.07);
        this.player1NextBlobA.create(this.game.width * 0.525, this.game.height * 0.2);
        this.player1NextBlobB = new Puyo(360, 120, this.player2Board.nextBlob2Color, this.game, this.game.width * 0.07, this.game.width * 0.07);
        this.player1NextBlobB.create(this.game.width * 0.525, this.game.height * 0.3);
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
        this.pauseButton.visible = false;
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
        
        this.reset_option = this.game.add.text(this.gameover_background.x, this.gameover_background.y - this.game.height * 0.05, 'RESET');
        this.reset_option.anchor.setTo(0.5);
        this.reset_option.font = 'Press Start 2P';
        this.reset_option.fill = '#55ff37';
        this.reset_option.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.reset_option.stroke = "#000000";
        this.reset_option.strokeThickness = 3;
        this.reset_option.inputEnabled = true;
        this.reset_option.input.useHandCursor = true;
        this.reset_option.events.onInputDown.add(this.reset);
        this.reset_option = 99;
        
        this.back_option = this.game.add.text(this.gameover_background.x, this.gameover_background.y + this.game.height * 0.05, 'BACK');
        this.back_option.anchor.setTo(0.5);
        this.back_option.font = 'Press Start 2P';
        this.back_option.fill = '#790ea3';
        this.back_option.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.back_option.stroke = "#000000";
        this.back_option.strokeThickness = 3;
        this.back_option.inputEnabled = true;
        this.back_option.input.useHandCursor = true;
        this.back_option.inputEnabled = true;
        this.back_option.events.onInputDown.add(this.goToMainMenu);
        this.back_option = 99;
        
        
        this.gameover_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - (this.game.height * 0.2), 'GAME OVER');
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
        this.gameover_text.fontSize = (this.game.height * 0.15).toString() + 'px';
        this.gameover_text.stroke = '#000000';
        this.gameover_text.strokeThickness = 5;
        this.gameover_text.z = 99;
        
        this.player1EndText = this.game.add.text(this.game.width * 0.2, this.game.world.centerY, "");
        this.player1EndText.anchor.setTo(0.5);
        this.player1EndText.font = 'Press Start 2P';
        this.player1EndText.fontSize = (this.game.height * 0.1).toString() + 'px';
        this.player1EndText.fill = '#364aff';
        this.player1EndText.stroke = '#ffffff';
        this.player1EndText.strokeThickness = 3;
        this.player1EndText.z = 99;
        
        this.player2EndText = this.game.add.text(this.game.width * 0.8, this.game.world.centerY, "");
        this.player2EndText.anchor.setTo(0.5);
        this.player2EndText.font = 'Press Start 2P';
        this.player2EndText.fontSize = (this.game.height * 0.1).toString() + 'px';
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
    
    //TODO
    showPauseMenu() {
        this.game.world.bringToTop(this.pauseMenuBackground);
        this.game.world.bringToTop(this.pauseMenuTitle);
        this.game.world.bringToTop(this.resumeButton);
        this.game.world.bringToTop(this.resetButton);
        this.game.world.bringToTop(this.quitButton);
        this.game.world.bringToTop(this.resumeButtonText);
        this.game.world.bringToTop(this.resetButtonText);
        this.game.world.bringToTop(this.quitButtonText);
        
        this.pauseButton.visible = false;
        this.pauseButtonText.visible = false;
        this.pauseMenuBackground.visible = true;
        this.pauseMenuTitle.visible = true;
        this.resumeButton.visible = true;
        this.resetButton.visible = true;
        this.quitButton.visible = true;
        this.resumeButtonText.visible = true;
        this.resetButtonText.visible = true;
        this.quitButtonText.visible= true;
    },
    
    //TODO
    hidePauseMenu() {
        this.pauseButton.visible = true;
        this.pauseButtonText.visible = true;
        this.pauseMenuBackground.visible = false;
        this.pauseMenuTitle.visible = false;
        this.resumeButton.visible = false;
        this.resetButton.visible = false;
        this.quitButton.visible = false;
        this.resumeButtonText.visible = false;
        this.resetButtonText.visible = false;
        this.quitButtonText.visible = false;
    },
    
    //TODO
    pause() {
        this.showPauseMenu();
        this.player1Board.pauseGame();
        this.player2Board.pauseGame();
    },
    
    //TODO
    resume() {
        this.player1Board.resumeGame();
        this.player2Board.resumeGame();
        this.hidePauseMenu();
    },
    
    resetWhenPaused() {
        this.player1Board.resumeGame();
        this.player2Board.resumeGame();
        this.state.restart();
    },
    
    quit() {
        this.player1Board.resumeGame();
        this.player2Board.resumeGame();
        this.state.start("MainMenuState");
    },
    
    goToMainMenu() {
        this.PuyoPuyo.InGameState.game.state.start('MainMenuState');
    }
};
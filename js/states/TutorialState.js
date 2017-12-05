var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.TutorialState = {
    create: function() {
        console.log("Tutorial");
        
        this.titleArray = ["Puyo Puyo", "The Basics", "Controls", "Chaining", "Clear Blobs", "Winning"];
        this.textArray = [
            "In Puyo Puyo, pairs of blobs constantly fall down the game screen with which you create color chains and matches to score points and block out your opponent.", 
            "Blobs come in a variety of colors, but always fall in pairs. Blob pairs will fall until one player fills to the top of their screen. These pairs can be moved side to side or rotated into arrangements to create chains of matching colors.",
            "There are two boards, with player 1 on the left and player 2 on the right. Player 1 uses A, S, and D keys to move their blobs left, right, or down while player 2 uses the arrow key. P1 uses C and V to rotate left and right while player 2 uses N and M.",
            "Blobs of matching colors that are directly neighboring create chains. Once a chain reaches a length of 4 or more, it is removed from the game screen and the player is awarded points. This will also create clear bubbles for the opponent.",
            "When a player creates a chain, the opponent will recieve 1 or more clear blobs. These blobs block any colored blobs from being chained through them. These are useful to force the opponent's stack to grow, pushing them closer to losing.", 
            "The game ends when one player's stack reaches the top of the game screen. The points earned from completed chains are then compared and the player with more points wins the game!"
        ];
        
        this.numPages = 5;
        this.currentPage = 0;
        
        this.background = this.game.add.sprite(0,0,'book');
        this.background.width = this.game.width;
        this.background.height = this.game.height;
        
        //Add all buttons on screen
        this.rightArrow = this.game.add.sprite(this.game.width*17/20,this.game.height*39/50,'arrow');
        this.rightArrow.width = 50;
        this.rightArrow.height = 40;
        this.rightArrow.anchor.x = .5;
        this.rightArrow.anchor.x = .5;
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.useHandCursor = true;
        this.rightArrow.events.onInputDown.add(this.rightArrowClick, this);
        
        this.leftArrow = this.game.add.sprite(this.game.width*3/20,this.game.height*39/50,'arrow');
        this.leftArrow.width = 50;
        this.leftArrow.height = 40;
        this.leftArrow.anchor.x = .5;
        this.leftArrow.anchor.x = .5;
        this.leftArrow.scale.x *= -1;
        this.leftArrow.visible = false;
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.useHandCursor = true;
        this.leftArrow.events.onInputDown.add(this.leftArrowClick, this);
        
        // Arrow key navigation
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.right.onDown.add(this.rightArrowClick, this);
        this.cursors.left.onDown.add(this.leftArrowClick, this);
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(this.goToMainMenu, this);
        
        this.exitButton = this.game.add.sprite(this.game.world.centerX, this.game.height*41/50, 'exit');
        this.exitButton.anchor.setTo(.5);
        this.exitButton.width = 70;
        this.exitButton.height = 60;
        this.exitButton.inputEnabled = true;
        this.exitButton.input.useHandCursor = true;
        this.exitButton.events.onInputDown.add(this.goToMainMenu, this);
        
        this.titleText = this.game.add.text(195, 70, this.titleArray[0]);
        this.titleText.anchor.setTo(0.5);
        this.titleText.font = 'Berkshire Swash';
        this.titleText.fontSize = 50;
        
        this.video1 = this.game.add.video('tutorial1');
        this.videoSprite1 = this.video1.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite1.visible = false;
        
        this.video2 = this.game.add.video('tutorial1');
        this.videoSprite2 = this.video2.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite2.visible = false;
        
        this.video3 = this.game.add.video('tutorial1');
        this.videoSprite3 = this.video3.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite3.visible = false;
        
        this.video4 = this.game.add.video('tutorial1');
        this.videoSprite4 = this.video4.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite4.visible = false;
        
        this.video5 = this.game.add.video('tutorial1');
        this.videoSprite5 = this.video5.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite5.visible = false;
        
        this.video6 = this.game.add.video('tutorial1');
        this.videoSprite6 = this.video5.addToWorld(460, 200, 0.5, 0.5, .2, .2);
        this.videoSprite6.visible = false;
        
        this.videoArray = [this.video1, this.video2, this.video3, this.video4, this.video5, this.video6];
        this.videoSpriteArray = [this.videoSprite1, this.videoSprite2, this.videoSprite3, this.videoSprite4, this.videoSprite5, this.videoSprite6];

        this.textStyle = { font: '14pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 250 };
        this.text = this.game.add.text(75, 100, this.textArray[0], this.textStyle);

        this.videoSpriteArray[0].visible = true;
        this.videoArray[0].play(true);
    },
    
    leftArrowClick() {
        if (this.currentPage == 0) {
            return;
        }
        if(this.currentPage == this.numPages) {
            this.rightArrow.visible = true;
        }
        this.videoSpriteArray[this.currentPage].visible = false;
        
        this.currentPage--;
        //change title
        this.videoArray[this.currentPage].currentTime = 0;
        this.titleText.setText(this.titleArray[this.currentPage]);
        
        //change body text
        this.text.setText(this.textArray[this.currentPage]);
        
        //change video
        this.videoSpriteArray[this.currentPage].visible = true;
        this.videoArray[this.currentPage].play(true);
        
        if(this.currentPage === 0) {
            this.leftArrow.visible = false;
        }
    },
    
    rightArrowClick() {
        if (this.currentPage == this.numPages) {
            return;
        }
        if(this.currentPage === 0) {
            this.leftArrow.visible = true;
        }
        
        this.videoSpriteArray[this.currentPage].visible = false;
        this.currentPage++;
        
        //change title
        this.videoArray[this.currentPage].currentTime = 0;
        this.titleText.setText(this.titleArray[this.currentPage]);
        
        //change body text
        console.log(this.currentPage);
        console.log(this.textArray[this.currentPage]);
        this.text.setText(this.textArray[this.currentPage]);
        
        
        //change video
        this.videoSpriteArray[this.currentPage].visible = true;
        this.videoArray[this.currentPage].play(true);
        
        
        if(this.currentPage == this.numPages) {
            this.rightArrow.visible = false;
        }
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
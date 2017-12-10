var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.TutorialState = {
    create: function() {
        console.log("Tutorial");
        
        this.titleArray = ["Puyo Puyo", "The Basics", "Controls", "Chaining", "Clear Blobs", "Winning"];
        this.textArray = [
            "In Puyo Puyo, pairs of blobs constantly fall down the game screen with which you create color chains and matches to score points and block out your opponent.", 
            "Blobs come in a variety of colors, but always fall in pairs. Blob pairs will fall until one player fills to the top of their screen. These pairs can be moved side to side or rotated into arrangements to create chains of matching colors.",
            "There are two boards, with player 1 on the left and player 2 on the right. Player 1 uses A, S, and D keys to move their blobs left, right, or down while player 2 uses the arrow keys. P1 uses the W key to rotate while player 2 uses the up arrow. These controls can be adjusted in the settings menu.",
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
        this.rightArrow = this.game.add.sprite(this.game.width*17/20,this.game.height*0.9,'arrow');
        this.rightArrow.width = this.game.width*0.1;
        this.rightArrow.height = this.game.height*0.08;
        this.rightArrow.anchor.x = .5;
        this.rightArrow.anchor.x = .5;
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.useHandCursor = true;
        this.rightArrow.events.onInputDown.add(this.rightArrowClick, this);
        
        this.leftArrow = this.game.add.sprite(this.game.width*3/20,this.game.height*0.9,'arrow');
        this.leftArrow.width = this.game.width*0.1;
        this.leftArrow.height = this.game.height*0.08;
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
        
        this.exitButton = this.game.add.sprite(this.game.world.centerX, this.game.height*0.92, 'exit');
        this.exitButton.anchor.setTo(.5);
        this.exitButton.width = this.game.width*0.1;
        this.exitButton.height = this.game.height*0.08;;
        this.exitButton.inputEnabled = true;
        this.exitButton.input.useHandCursor = true;
        this.exitButton.events.onInputDown.add(this.goToMainMenu, this);
        
        this.titleText = this.game.add.text(this.game.width * 0.05, this.game.height * 0.05, this.titleArray[0]);
        this.titleText.anchor.setTo(0);
        this.titleText.font = 'Berkshire Swash';
        this.titleText.fontSize = (this.game.height * 0.17).toString() + 'px';
        
        this.video1 = this.game.add.video('tutorial1');
        this.videoSprite1 = this.video1.addToWorld(this.game.width * 0.7, this.game.height * 0.1, 0, 0, this.game.width/2500, this.game.width/2500);
        this.videoSprite1.visible = false;
        
        this.video2 = this.game.add.video('tutorial2');
        this.videoSprite2 = this.video2.addToWorld(this.game.width * 0.7, this.game.height * 0.1, 0, 0, this.game.width/2500, this.game.width/2500);
        this.videoSprite2.visible = false;
        
        this.video3 = this.game.add.video('tutorial3');
        this.videoSprite3 = this.video3.addToWorld(this.game.width * 0.7, this.game.height * 0.1, 0, 0, this.game.width/2500, this.game.width/2500);
        this.videoSprite3.visible = false;
        
        this.video4 = this.game.add.video('tutorial4');
        this.videoSprite4 = this.video4.addToWorld(this.game.width * 0.7, this.game.height * 0.1, 0, 0, this.game.width/2500, this.game.width/2500);
        this.videoSprite4.visible = false;
        
        this.akey = this.game.add.sprite(this.game.width*29/40,this.game.height*0.3,'aKey');
        this.akey.width = this.game.width*0.05;
        this.akey.height = this.game.height*0.07;
        this.akey.anchor.x = .5;
        this.akey.anchor.x = .5;
        this.akey.visible = true;
        
        this.skey = this.game.add.sprite(this.game.width*29/40,this.game.height*0.4,'sKey');
        this.skey.width = this.game.width*0.05;
        this.skey.height = this.game.height*0.07;
        this.skey.anchor.x = .5;
        this.skey.anchor.x = .5;
        this.skey.visible = true;
        
        this.dkey = this.game.add.sprite(this.game.width*29/40,this.game.height*0.5,'dKey');
        this.dkey.width = this.game.width*0.05;
        this.dkey.height = this.game.height*0.07;
        this.dkey.anchor.x = .5;
        this.dkey.anchor.x = .5;
        this.dkey.visible = true;
        
        this.wkey = this.game.add.sprite(this.game.width*29/40,this.game.height*0.6,'wKey');
        this.wkey.width = this.game.width*0.05;
        this.wkey.height = this.game.height*0.07;
        this.wkey.anchor.x = .5;
        this.wkey.anchor.x = .5;
        this.wkey.visible = true;
        
        this.leftKey = this.game.add.sprite(this.game.width*37/40,this.game.height*0.3,'leftKey');
        this.leftKey.width = this.game.width*0.05;
        this.leftKey.height = this.game.height*0.07;
        this.leftKey.anchor.x = .5;
        this.leftKey.anchor.x = .5;
        this.leftKey.visible = true;
        
        this.downKey = this.game.add.sprite(this.game.width*37/40,this.game.height*0.4,'downKey');
        this.downKey.width = this.game.width*0.05;
        this.downKey.height = this.game.height*0.07;
        this.downKey.anchor.x = .5;
        this.downKey.anchor.x = .5;
        this.downKey.visible = true;
        
        this.rightKey = this.game.add.sprite(this.game.width*37/40,this.game.height*0.5,'rightKey');
        this.rightKey.width = this.game.width*0.05;
        this.rightKey.height = this.game.height*0.07;
        this.rightKey.anchor.x = .5;
        this.rightKey.anchor.x = .5;
        this.rightKey.visible = true;
        
        this.upKey = this.game.add.sprite(this.game.width*37/40,this.game.height*0.6,'upKey');
        this.upKey.width = this.game.width*0.05;
        this.upKey.height = this.game.height*0.07;
        this.upKey.anchor.x = .5;
        this.upKey.anchor.x = .5;
        this.upKey.visible = true;
        
        this.p1Text = this.game.add.text(this.game.width * .71, this.game.height * .24, "P1", this.textStyle);
        this.p2Text = this.game.add.text(this.game.width * .91, this.game.height * .24, "P2", this.textStyle);
        this.p1Text.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.p2Text.fontSize = (this.game.height * 0.05).toString() + 'px';
        
        this.leftText = this.game.add.text(this.game.width * .78, this.game.height * .31, "LEFT", this.textStyle);
        this.downText = this.game.add.text(this.game.width * .77, this.game.height * .41, "DOWN", this.textStyle);
        this.rightText = this.game.add.text(this.game.width * .77, this.game.height * .51, "RIGHT", this.textStyle);
        this.rotateText = this.game.add.text(this.game.width * .76, this.game.height * .61, "ROTATE", this.textStyle);
        this.leftText.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.downText.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.rightText.fontSize = (this.game.height * 0.05).toString() + 'px';
        this.rotateText.fontSize = (this.game.height * 0.05).toString() + 'px';
        
        this.videoArray = [this.video1, this.video2, this.video3, this.video4];
        this.videoSpriteArray = [this.videoSprite1, this.videoSprite2, this.videoSprite3, this.videoSprite4];

        this.textStyle = { font: '14pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: this.game.width * 0.6 };
        this.text = this.game.add.text(this.game.width * 0.05, this.game.height * 0.25, this.textArray[0], this.textStyle);
        this.text.fontSize = (this.game.height * 0.05).toString() + 'px';

        this.wkey.visible = false;
        this.akey.visible = false;
        this.skey.visible = false;
        this.dkey.visible = false;
        this.upKey.visible = false;
        this.downKey.visible = false;
        this.leftKey.visible = false;
        this.rightKey.visible = false;
        this.p1Text.visible = false;
        this.p2Text.visible = false;
        this.leftText.visible = false;
        this.rightText.visible = false;
        this.downText.visible = false;
        this.rotateText.visible = false;
                
        this.videoSpriteArray[0].visible = true;
        this.videoArray[0].play(true);
        this.videoArray[1].play(true);
        this.videoArray[2].play(true);
        this.videoArray[3].play(true);
    },
    
    leftArrowClick() {
        if (this.currentPage == 0) {
            return;
        }
        if(this.currentPage == this.numPages) {
            this.rightArrow.visible = true;
        }
        
        this.currentPage--;
        
        //change title
        this.titleText.setText(this.titleArray[this.currentPage]);
        
        //change body text
        this.text.setText(this.textArray[this.currentPage]);
        
        this.updateContent(false);
        
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
        
        this.currentPage++;
        
        //change title
        this.titleText.setText(this.titleArray[this.currentPage]);
        
        //change body text
        this.text.setText(this.textArray[this.currentPage]);
        
        this.updateContent(true);
        
        if(this.currentPage == this.numPages) {
            this.rightArrow.visible = false;
        }
    },
    
    updateContent(rightArrow) {
        
        if(this.currentPage == 1 && !rightArrow) {
            this.wkey.visible = false;
            this.akey.visible = false;
            this.skey.visible = false;
            this.dkey.visible = false;
            this.upKey.visible = false;
            this.downKey.visible = false;
            this.leftKey.visible = false;
            this.rightKey.visible = false;
            this.p1Text.visible = false;
            this.p2Text.visible = false;
            this.leftText.visible = false;
            this.rightText.visible = false;
            this.downText.visible = false;
            this.rotateText.visible = false;
            this.videoSpriteArray[0].visible = true;
            this.videoArray[0].currentTime = 0;
        }
        
        //Controls
        if(this.currentPage == 2) {
            if(rightArrow) {
                this.videoSpriteArray[0].visible = false;
                
            }
            else {
                this.videoSpriteArray[1].visible = false;
            }
            this.wkey.visible = true;
            this.akey.visible = true;
            this.skey.visible = true;
            this.dkey.visible = true;
            this.upKey.visible = true;
            this.downKey.visible = true;
            this.leftKey.visible = true;
            this.rightKey.visible = true;
            this.p1Text.visible = true;
            this.p2Text.visible = true;
            this.leftText.visible = true;
            this.rightText.visible = true;
            this.downText.visible = true;
            this.rotateText.visible = true;
        }
        
        if(this.currentPage == 3) {
            if(rightArrow) {
                this.wkey.visible = false;
                this.akey.visible = false;
                this.skey.visible = false;
                this.dkey.visible = false;
                this.upKey.visible = false;
                this.downKey.visible = false;
                this.leftKey.visible = false;
                this.rightKey.visible = false;
                this.p1Text.visible = false;
                this.p2Text.visible = false;
                this.leftText.visible = false;
                this.rightText.visible = false;
                this.downText.visible = false;
                this.rotateText.visible = false;
                this.videoSpriteArray[1].visible = true;
                this.videoArray[1].currentTime = 0;
            }
            else {
                this.videoSpriteArray[2].visible = false;
                this.videoSpriteArray[1].visible = true;
                this.videoArray[1].currentTime = 0;
            }
        }
        
        if(this.currentPage == 4) {
            if(rightArrow) {
                this.videoSpriteArray[1].visible = false;
                this.videoSpriteArray[2].visible = true;
                this.videoArray[2].currentTime = 0;
            }
            else {
                this.videoSpriteArray[3].visible = false;
                this.videoSpriteArray[2].visible = true;
                this.videoArray[2].currentTime = 0;
            }
        }
        
        if(this.currentPage == 5) {
            if(rightArrow) {
                this.videoSpriteArray[2].visible = false;
                this.videoSpriteArray[3].visible = true;
                this.videoArray[3].currentTime = 0;
            }
        }
        
        //this.videoSpriteArray[this.currentPage].visible = false;
        //this.videoArray[this.currentPage].currentTime = 0;
        //this.videoSpriteArray[this.currentPage].visible = true;
        //this.videoArray[this.currentPage].play(true);
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
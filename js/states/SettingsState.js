var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.SettingsState = {
    create: function() {
        console.log("SETTINGS");
        this.backgroundWall = this.game.add.tileSprite(0,0,this.game.width, this.game.height, 'brick_wall');
        this.titleText = this.game.add.text(this.game.world.centerX, 55, "Settings");
        this.titleText.fontSize = 50;
        this.titleText.anchor.setTo(.5);
        this.titleText.font = 'Press Start 2P';
        this.titleText.stroke = '#000000';
        this.titleText.strokeThickness = 6;
        this.titleText.fill = '#ffffff';
        
        this.p1Space = this.game.add.tileSprite(7,95,325, 225, 'brick_wall_dark');
        this.p1Space = this.game.add.tileSprite(375,95,325, 225, 'brick_wall_dark');
        
        this.p1Title = this.game.add.text(this.game.width*13/50, this.game.width*9/50, "Player 1 Controls");
        this.p1Title.fontSize = 15;
        this.p1Title.anchor.setTo(.5);
        this.p1Title.font = 'Press Start 2P';
        this.p1Title.stroke = '#000000';
        this.p1Title.strokeThickness = 6;
        this.p1Title.fill = '#ffffff';
        
        this.p2Title = this.game.add.text(this.game.width*39/50, this.game.width*9/50, "Player 2 Controls");
        this.p2Title.fontSize = 15;
        this.p2Title.anchor.setTo(.5);
        this.p2Title.font = 'Press Start 2P';
        this.p2Title.stroke = '#000000';
        this.p2Title.strokeThickness = 6;
        this.p2Title.fill = '#ffffff';
        
        /*this.leftText = this.game.add.text(this.game.world.centerX, 75, "Left:");
        this.leftText.fontSize = 13;
        this.leftText.anchor.setTo(.5);
        this.leftText.font = 'Press Start 2P';
        this.leftText.stroke = '#000000';
        this.leftText.strokeThickness = 6;
        this.leftText.fill = '#ffffff';
        
        this.rightText = this.game.add.text(this.game.world.centerX, 75, "Right:");
        this.rightText.fontSize = 13;
        this.rightText.anchor.setTo(.5);
        this.rightText.font = 'Press Start 2P';
        this.rightText.stroke = '#000000';
        this.rightText.strokeThickness = 6;
        this.rightText.fill = '#ffffff';
        
        this.downText = this.game.add.text(this.game.world.centerX, 75, "Down:");
        this.downText.fontSize = 13;
        this.downText.anchor.setTo(.5);
        this.downText.font = 'Press Start 2P';
        this.downText.stroke = '#000000';
        this.downText.strokeThickness = 6;
        this.downText.fill = '#ffffff';
        
        this.rotateLeftText = this.game.add.text(this.game.world.centerX, 75, "Rotate Left:");
        this.rotateLeftText.fontSize = 13;
        this.rotateLeftText.anchor.setTo(.5);
        this.rotateLeftText.font = 'Press Start 2P';
        this.rotateLeftText.stroke = '#000000';
        this.rotateLeftText.strokeThickness = 6;
        this.rotateLeftText.fill = '#ffffff';
        
        this.rotateRightText = this.game.add.text(this.game.world.centerX, 75, "Rotate Right:");
        this.rotateRightText.fontSize = 13;
        this.rotateRightText.anchor.setTo(.5);
        this.rotateRightText.font = 'Press Start 2P';
        this.rotateRightText.stroke = '#000000';
        this.rotateRightText.strokeThickness = 6;
        this.rotateRightText.fill = '#ffffff';*/
        
        this.saveButton = this.game.add.sprite(this.game.world.centerX, this.game.height*18/20, 'save');
        this.saveButton.height = 90;
        this.saveButton.width = 90;
        this.saveButton.anchor.setTo(.5);
        this.saveButton.inputEnabled = true;
        this.saveButton.events.onInputDown.add(this.goToMainMenu, this);
    },
    
    update: function() {
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
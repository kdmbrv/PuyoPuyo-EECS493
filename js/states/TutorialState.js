var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.TutorialState = {
    create: function() {
        console.log("Tutorial");
        this.background = this.game.add.sprite(0,0,'book');
        this.background.width = this.game.width;
        this.background.height = this.game.height;
        this.rightArrow = this.game.add.sprite(this.game.width*17/20,this.game.height*39/50,'arrow');
        this.rightArrow.width = 50;
        this.rightArrow.height = 40;
        this.rightArrow.anchor.x = .5;
        this.rightArrow.anchor.x = .5;
        
        this.leftArrow = this.game.add.sprite(this.game.width*3/20,this.game.height*39/50,'arrow');
        this.leftArrow.width = 50;
        this.leftArrow.height = 40;
        this.leftArrow.anchor.x = .5;
        this.leftArrow.anchor.x = .5;
        this.leftArrow.scale.x *= -1;
        
        this.text = this.game.add.text(195, 70, "Puyo Puyo");
        this.text.anchor.setTo(0.5);

        this.text.font = 'Berkshire Swash';
        this.text.fontSize = 50;
        
        this.exitButton = this.game.add.sprite(this.game.world.centerX, this.game.height*41/50, 'exit');
        this.exitButton.anchor.setTo(.5);
        this.exitButton.width = 70;
        this.exitButton.height = 70;
        this.exitButton.inputEnabled = true;
        this.exitButton.events.onInputDown.add(this.goToMainMenu, this);
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
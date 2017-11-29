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
        
        this.video = this.game.add.video('tutorial1');

        //  See the docs for the full parameters
        //  But it goes x, y, anchor x, anchor y, scale x, scale y
        this.videoSprite = this.video.addToWorld(460, 200, 0.5, 0.5, .2, .2);

        var style = { font: '14pt Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 250 };

        var text = this.game.add.text(75, 110, "Welcome to Puyo Puyo! This is a competitive style tetris game where two players compete to make the other player reach the top first and lose...", style);

        //  true = loop
        this.video.play(true);
        
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
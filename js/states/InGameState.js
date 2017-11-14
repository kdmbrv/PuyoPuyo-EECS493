var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.InGameState = {
    create: function() {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.logo = this.game.add.sprite(0, 0, 'inGame');
        this.logo.x = this.game.width / 2 ;
        this.logo.y = this.game.height / 2 ;
        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
        this.logo.height = this.game.height * (160/224);
        this.logo.width = this.game.width * (272/320);
        this.logo.inputEnabled = true;
        this.logo.inputEnabled = true;
        this.logo.events.onInputDown.add(this.goToMainMenu, this);
    },
    
    goToMainMenu() {
        this.state.start("MainMenuState");
    }
};
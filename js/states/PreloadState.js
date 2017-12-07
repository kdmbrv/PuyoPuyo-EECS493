var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.PreloadState = {
    preload: function() {
        console.log("starting");
        this.load.image('mm_bg1', 'img/mountain.png');
        this.load.image('mm_bg2', 'img/cloud.png');
        this.load.image('mm_bg3', 'img/cloud2.png');
        this.load.image('mm_bg4', 'img/cloud2.png');
        this.load.image('mm_bg5', 'img/cloud2.png');
        this.load.image('inGame', 'img/inGame.png');
        this.load.image('redCircle', 'img/redCircle.png');
        this.load.image('blueCircle', 'img/blueCircle.png');
        this.load.image('greenCircle', 'img/greenCircle.png');
        this.load.image('yellowCircle', 'img/yellowCircle.png');
        this.load.image('purpleCircle', 'img/purpleCircle.png');
        this.load.image('whiteCircle', 'img/whiteCircle.png');
        this.load.image('blackCircle', 'img/blackCircle.png');
        this.load.image('redParticle', 'img/redParticle.png');
        this.load.image('yellowParticle', 'img/yellowParticle.png');
        this.load.image('greenParticle', 'img/greenParticle.png');
        this.load.image('blueParticle', 'img/blueParticle.png');
        this.load.image('purpleParticle', 'img/purpleParticle.png');
        this.load.image('whiteParticle', 'img/whiteParticle.png');
        this.load.image('pauseButton', 'img/PauseButton.png');
        this.load.image('whiteButton', 'img/whiteButton.png');
        this.load.image('inGameBackgroundPic', 'img/inGameBackGroundPic.png');
        this.load.image('settingBackGroundPic', 'img/settingBackGround.png');
        // this.load.image('brick_wall', 'img/brickWall.png');
        // this.load.image('brick_wall_dark', 'img/brickWallDark.png');
        this.load.image('book', 'img/inGameBackGroundPic.png');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('settingsArrow', 'img/settingsArrow.png');
        this.load.image('exit', 'img/exit.png');
        this.load.image('save', 'img/save.png');
        this.load.spritesheet('puyo', 'img/puyo.png', 16, 16);
        this.load.spritesheet('mm_blob', 'img/blob.png', 18, 16);
        this.load.image('menu', 'img/menu_background.png');
        this.load.image('logo', 'img/logo.png');
        this.load.image('tutorial_graphic', 'img/tutorial.png');
        this.load.image('pvc_graphic', 'img/player_vs_computer.png');
        this.load.image('pvp_graphic', 'img/player_vs_player.png');
        this.load.image('settings_graphic', 'img/settings.png');
        this.load.image('black', 'img/black.png');
        this.load.image('wood', 'img/wood.png');
        this.game.load.video('tutorial1', 'img/tutorial1.mp4');
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
        console.log("here");
        PuyoPuyo.game.state.start("MainMenuState");
    }
};
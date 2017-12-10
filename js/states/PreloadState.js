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
        this.load.image('whiteCircle', 'img/clearBlob.png');
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
        this.load.image('exit', 'img/exit2.png');
        this.load.image('save', 'img/save2.png');
        this.load.spritesheet('puyo', 'img/hiresBlobs.png', 128, 128);
        this.load.spritesheet('mm_blob', 'img/mmBlob.png', 144, 128);
        this.load.image('menu', 'img/menu_background.png');
        this.load.image('logo', 'img/logo.png');
        this.load.image('tutorial_graphic', 'img/tutorial.png');
        this.load.image('pvc_graphic', 'img/player_vs_computer.png');
        this.load.image('pvp_graphic', 'img/player_vs_player.png');
        this.load.image('settings_graphic', 'img/settings.png');
        this.load.image('black', 'img/black.png');
        this.load.image('wood', 'img/wood.png');
        this.game.load.video('tutorial1', 'img/tut1.mp4');
        this.game.load.video('tutorial2', 'img/tut2.mp4');
        this.game.load.video('tutorial3', 'img/tut3.mp4');
        this.game.load.video('tutorial4', 'img/tut4.mp4');
        
        //Keys
        this.load.image('aKey', 'img/a.png');
        this.load.image('sKey', 'img/s.png');
        this.load.image('dKey', 'img/d.png');
        this.load.image('wKey', 'img/w.png');
        this.load.image('upKey', 'img/cursor-up.png');
        this.load.image('leftKey', 'img/cursor-left.png');
        this.load.image('rightKey', 'img/cursor-right.png');
        this.load.image('downKey', 'img/cursor-down.png');
        
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
        if(this.game.scale.aspectRatio > 1.44444) {
            this.game.scale.setGameSize(this.game.scale.height * 1.44444, this.game.scale.height);
        } else {
            this.game.scale.setGameSize(this.game.scale.width, this.game.scale.width / 1.44444);
        }
    },
    create: function() {
        console.log("here");
        this.game.state.start("MainMenuState");
    }
};
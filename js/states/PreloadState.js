var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.PreloadState = {
    preload: function() {
        console.log("starting");
        this.load.image('mm_bg1', 'img/mm_bg1.png');
        this.load.image('mm_bg2', 'img/mm_bg2.png');
        this.load.image('mm_bg3', 'img/mm_bg3.png');
        this.load.image('mm_bg4', 'img/mm_bg4.png');
        this.load.image('mm_bg5', 'img/mm_bg5.png');
        this.load.image('inGame', 'img/inGame.png');
        this.load.image('redCircle', 'img/redCircle.png');
        this.load.image('blueCircle', 'img/blueCircle.png');
        this.load.image('greenCircle', 'img/greenCircle.png');
        this.load.image('yellowCircle', 'img/yellowCircle.png');
        this.load.image('purpleCircle', 'img/purpleCircle.png');
        this.load.image('brick_wall', 'img/brickWall.png');
        this.load.image('brick_wall_dark', 'img/brickWallDark.png');
        this.load.image('book', 'img/book.png');
        this.load.image('arrow', 'img/arrow.png');
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
        this.game.load.video('tutorial1', 'img/tutorial1.mp4');
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
        console.log("here");
        PuyoPuyo.game.state.start("MainMenuState");
    }
};
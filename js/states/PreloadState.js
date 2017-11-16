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
        this.load.spritesheet('puyo', 'img/puyo.png', 16, 16);
        this.load.spritesheet('mm_blob', 'img/blob.png', 18, 16);
        this.load.image('fake_menu', 'img/fake_menu.png');
    },
    create: function() {
        console.log("here");
        PuyoPuyo.game.state.start("MainMenuState");
    }
};
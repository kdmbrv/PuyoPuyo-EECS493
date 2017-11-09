/* global Phaser */

var game = new Phaser.Game("100", "100", Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);

var mainMenu;

class MMBlob {
    constructor() {
        game.load.spritesheet('mm_blob', 'img/blob.png', 18, 16);
    }
    
    create() {
        this.sprite = game.add.sprite(0, 0, 'mm_blob');
        this.sprite.x = game.width * (60/320);
        this.sprite.y = game.height * (90/224);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.height = game.height * (16/224);
        this.sprite.width = game.width * (18/320);
        this.sprite.animations.add('wobble');
        this.sprite.animations.play('wobble', 8, true);
    }
}

class MainMenu {
    constructor() {
        game.load.image('mm_bg1', 'img/mm_bg1.png');
        game.load.image('mm_bg2', 'img/mm_bg2.png');
        game.load.image('mm_bg3', 'img/mm_bg3.png');
        game.load.image('mm_bg4', 'img/mm_bg4.png');
        game.load.image('mm_bg5', 'img/mm_bg5.png');
        game.load.image('fake_menu', 'img/fake_menu.png');
        this.blob = new MMBlob();
        this.moveSpeed2 = 0.03;
        this.moveSpeed3 = 0.06;
        this.moveSpeed4 = 0.12;
        this.moveSpeed5 = 0.24;
    }
    
    create() {
        this.mm_bg1 = game.add.sprite(0, 0, 'mm_bg1');
        this.mm_bg1.y = game.height * (1 - 97/224);
        this.mm_bg1.height = game.height * (97/224);
        this.mm_bg1.width = game.width;
        
        this.mm_bg2 = game.add.sprite(0, 0, 'mm_bg2');
        this.mm_bg2.y = game.height * (1 - 130/224);
        this.mm_bg2.height = game.height * (33/224);
        this.mm_bg2.width = game.width;
        
        this.mm_bg2_2 = game.add.sprite(0, 0, 'mm_bg2');
        this.mm_bg2_2.y = game.height * (1 - 130/224);
        this.mm_bg2_2.x = game.width;
        this.mm_bg2_2.height = game.height * (33/224);
        this.mm_bg2_2.width = game.width;
        
        this.mm_bg3 = game.add.sprite(0, 0, 'mm_bg3');
        this.mm_bg3.y = game.height * (1 - 157/224);
        this.mm_bg3.height = game.height * (27/224);
        this.mm_bg3.width = game.width;
        
        this.mm_bg3_2 = game.add.sprite(0, 0, 'mm_bg3');
        this.mm_bg3_2.y = game.height * (1 - 157/224);
        this.mm_bg3_2.x = game.width;
        this.mm_bg3_2.height = game.height * (27/224);
        this.mm_bg3_2.width = game.width;
        
        this.mm_bg4 = game.add.sprite(0, 0, 'mm_bg4');
        this.mm_bg4.y = game.height * (1 - 182/224);
        this.mm_bg4.height = game.height * (25/224);
        this.mm_bg4.width = game.width;
        
        this.mm_bg4_2 = game.add.sprite(0, 0, 'mm_bg4');
        this.mm_bg4_2.y = game.height * (1 - 182/224);
        this.mm_bg4_2.x = game.width;
        this.mm_bg4_2.height = game.height * (25/224);
        this.mm_bg4_2.width = game.width;
        
        this.mm_bg5 = game.add.sprite(0, 0, 'mm_bg5');
        this.mm_bg5.height = game.height * (42/224);
        this.mm_bg5.width = game.width;
        
        this.mm_bg5_2 = game.add.sprite(0, 0, 'mm_bg5');
        this.mm_bg5_2.x = game.width;
        this.mm_bg5_2.height = game.height * (42/224);
        this.mm_bg5_2.width = game.width;
        
        this.fake_menu = game.add.sprite(0, 0, 'fake_menu');
        this.fake_menu.x = game.width / 2 ;
        this.fake_menu.y = game.height / 2 ;
        this.fake_menu.anchor.x = 0.5;
        this.fake_menu.anchor.y = 0.5;
        this.fake_menu.height = game.height * (160/224);
        this.fake_menu.width = game.width * (272/320);
        
        this.blob.create();
    }
    
    update(delta) {
        this.mm_bg2.x -= delta * this.moveSpeed2;
        this.mm_bg2_2.x -= delta * this.moveSpeed2;
        if(this.mm_bg2_2.x < 0)
        {
            this.mm_bg2.x = 0;
            this.mm_bg2_2.x = game.width;
        }
        
        this.mm_bg3.x -= delta * this.moveSpeed3;
        this.mm_bg3_2.x -= delta * this.moveSpeed3;
        if(this.mm_bg3_2.x < 0)
        {
            this.mm_bg3.x = 0;
            this.mm_bg3_2.x = game.width;
        }    
    
        this.mm_bg4.x -= delta * this.moveSpeed4;
        this.mm_bg4_2.x -= delta * this.moveSpeed4;
        if(this.mm_bg4_2.x < 0)
        {
            this.mm_bg4.x = 0;
            this.mm_bg4_2.x = game.width;
        }
        
        this.mm_bg5.x -= delta * this.moveSpeed5;
        this.mm_bg5_2.x -= delta * this.moveSpeed5;
        if(this.mm_bg5_2.x < 0)
        {
            this.mm_bg5.x = 0;
            this.mm_bg5_2.x = game.width;
        }
    }
}

function preload() {
    // Load images to use as the game sprites
    mainMenu =  new MainMenu();
}

function create() {
    // Create background images
    mainMenu.create();
}

function update() {
    // Move sprite up and down smoothly for show
    var delta = game.time.elapsed;
    mainMenu.update(delta);
}

function render() {

}
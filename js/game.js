/* global Phaser */

var game = new Phaser.Game("100", "100", Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, false, false);

var mm_bg1, mm_bg2, mm_bg3, mm_bg4, mm_bg5, fake_menu;
var mm_bg2_2, mm_bg3_2, mm_bg4_2, mm_bg5_2;
var moveSpeed2 = 0.03, moveSpeed3 = 0.06, moveSpeed4 = 0.12, moveSpeed5 = 0.24;
var mainMenu;

class MainMenu {
    constructor() {
        game.load.image('mm_bg1', 'img/mm_bg1.png');
        game.load.image('mm_bg2', 'img/mm_bg2.png');
        game.load.image('mm_bg3', 'img/mm_bg3.png');
        game.load.image('mm_bg4', 'img/mm_bg4.png');
        game.load.image('mm_bg5', 'img/mm_bg5.png');
        game.load.image('fake_menu', 'img/fake_menu.png');
    }
    
    create() {
        mm_bg1 = game.add.sprite(0, 0, 'mm_bg1');
        mm_bg1.y = game.height * (1 - 97/224);
        mm_bg1.height = game.height * (97/224);
        mm_bg1.width = game.width;
        
        mm_bg2 = game.add.sprite(0, 0, 'mm_bg2');
        mm_bg2.y = game.height * (1 - 130/224);
        mm_bg2.height = game.height * (33/224);
        mm_bg2.width = game.width;
        
        mm_bg2_2 = game.add.sprite(0, 0, 'mm_bg2');
        mm_bg2_2.y = game.height * (1 - 130/224);
        mm_bg2_2.x = game.width;
        mm_bg2_2.height = game.height * (33/224);
        mm_bg2_2.width = game.width;
        
        mm_bg3 = game.add.sprite(0, 0, 'mm_bg3');
        mm_bg3.y = game.height * (1 - 157/224);
        mm_bg3.height = game.height * (27/224);
        mm_bg3.width = game.width;
        
        mm_bg3_2 = game.add.sprite(0, 0, 'mm_bg3');
        mm_bg3_2.y = game.height * (1 - 157/224);
        mm_bg3_2.x = game.width;
        mm_bg3_2.height = game.height * (27/224);
        mm_bg3_2.width = game.width;
        
        mm_bg4 = game.add.sprite(0, 0, 'mm_bg4');
        mm_bg4.y = game.height * (1 - 182/224);
        mm_bg4.height = game.height * (25/224);
        mm_bg4.width = game.width;
        
        mm_bg4_2 = game.add.sprite(0, 0, 'mm_bg4');
        mm_bg4_2.y = game.height * (1 - 182/224);
        mm_bg4_2.x = game.width;
        mm_bg4_2.height = game.height * (25/224);
        mm_bg4_2.width = game.width;
        
        mm_bg5 = game.add.sprite(0, 0, 'mm_bg5');
        mm_bg5.height = game.height * (42/224);
        mm_bg5.width = game.width;
        
        mm_bg5_2 = game.add.sprite(0, 0, 'mm_bg5');
        mm_bg5_2.x = game.width;
        mm_bg5_2.height = game.height * (42/224);
        mm_bg5_2.width = game.width;
        
        fake_menu = game.add.sprite(0, 0, 'fake_menu');
        fake_menu.x = game.width / 2 ;
        fake_menu.y = game.height / 2 ;
        fake_menu.anchor.x = 0.5;
        fake_menu.anchor.y = 0.5;
        fake_menu.height = game.height * (160/224);
        fake_menu.width = game.width * (272/320);
    }
    
    update(delta) {
        mm_bg2.x -= delta * moveSpeed2;
        mm_bg2_2.x -= delta * moveSpeed2;
        if(mm_bg2_2.x < 0)
        {
            mm_bg2.x = 0;
            mm_bg2_2.x = game.width;
        }
        
        mm_bg3.x -= delta * moveSpeed3;
        mm_bg3_2.x -= delta * moveSpeed3;
        if(mm_bg3_2.x < 0)
        {
            mm_bg3.x = 0;
            mm_bg3_2.x = game.width;
        }    
    
        mm_bg4.x -= delta * moveSpeed4;
        mm_bg4_2.x -= delta * moveSpeed4;
        if(mm_bg4_2.x < 0)
        {
            mm_bg4.x = 0;
            mm_bg4_2.x = game.width;
        }
        
        mm_bg5.x -= delta * moveSpeed5;
        mm_bg5_2.x -= delta * moveSpeed5;
        if(mm_bg5_2.x < 0)
        {
            mm_bg5.x = 0;
            mm_bg5_2.x = game.width;
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
var PuyoPuyo = PuyoPuyo || {};

var puyo;

var cursors;
var enter;
var frameCounter = 0;

PuyoPuyo.MainMenuState = {
    
    preload() {
        this. pSprites = new PuyoSprites();
    },
    
    create() {
        this.moveSpeed2 = 0.03;
        this.moveSpeed3 = 0.06;
        this.moveSpeed4 = 0.12;
        this.moveSpeed5 = 0.24;
        
        this.mm_bg1 = this.game.add.sprite(0, 0, 'mm_bg1');
        this.mm_bg1.y = this.game.height * (1 - 97/224);
        this.mm_bg1.height = this.game.height * (97/224);
        this.mm_bg1.width = this.game.width;
        
        this.mm_bg2 = this.game.add.sprite(0, 0, 'mm_bg2');
        this.mm_bg2.y = this.game.height * (1 - 130/224);
        this.mm_bg2.height = this.game.height * (33/224);
        this.mm_bg2.width = this.game.width;
        
        this.mm_bg2_2 = this.game.add.sprite(0, 0, 'mm_bg2');
        this.mm_bg2_2.y = this.game.height * (1 - 130/224);
        this.mm_bg2_2.x = this.game.width;
        this.mm_bg2_2.height = this.game.height * (33/224);
        this.mm_bg2_2.width = this.game.width;
        
        this.mm_bg3 = this.game.add.sprite(0, 0, 'mm_bg3');
        this.mm_bg3.y = this.game.height * (1 - 157/224);
        this.mm_bg3.height = this.game.height * (27/224);
        this.mm_bg3.width = this.game.width;
        
        this.mm_bg3_2 = this.game.add.sprite(0, 0, 'mm_bg3');
        this.mm_bg3_2.y = this.game.height * (1 - 157/224);
        this.mm_bg3_2.x = this.game.width;
        this.mm_bg3_2.height = this.game.height * (27/224);
        this.mm_bg3_2.width = this.game.width;
        
        this.mm_bg4 = this.game.add.sprite(0, 0, 'mm_bg4');
        this.mm_bg4.y = this.game.height * (1 - 182/224);
        this.mm_bg4.height = this.game.height * (25/224);
        this.mm_bg4.width = this.game.width;
        
        this.mm_bg4_2 = this.game.add.sprite(0, 0, 'mm_bg4');
        this.mm_bg4_2.y = this.game.height * (1 - 182/224);
        this.mm_bg4_2.x = this.game.width;
        this.mm_bg4_2.height = this.game.height * (25/224);
        this.mm_bg4_2.width = this.game.width;
        
        this.mm_bg5 = this.game.add.sprite(0, 0, 'mm_bg5');
        this.mm_bg5.height = this.game.height * (42/224);
        this.mm_bg5.width = this.game.width;
        
        this.mm_bg5_2 = this.game.add.sprite(0, 0, 'mm_bg5');
        this.mm_bg5_2.x = this.game.width;
        this.mm_bg5_2.height = this.game.height * (42/224);
        this.mm_bg5_2.width = this.game.width;
        
        // Add logo
        this.logo = this.game.add.sprite(0, 0, 'logo');
        this.logo.x = this.game.width / 2;
        this.logo.y = this.game.height / 9;
        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
        this.logo.height = this.game.height * (50/224);
        this.logo.width = this.game.width * (272/320);
        
        // Add menu
        this.menu = this.game.add.sprite(0, 0, 'menu');
        this.menu.x = this.game.width / 2 ;
        this.menu.y = this.game.height / 2 ;
        this.menu.anchor.x = 0.5;
        this.menu.anchor.y = 0.5;
        this.menu.height = this.game.height * (140/224);
        this.menu.width = this.game.width * (272/320);
        this.menu.inputEnabled = true;
        this.menu.events.onInputDown.add(this.startGame, this);
        
        // Add menu options
        this.tutorial_option = this.game.add.sprite(0, 0, 'tutorial_graphic');
        this.tutorial_option.x = this.game.width * (70/320);
        this.tutorial_option.y = this.game.height * (65/224);
        this.tutorial_option.anchor.x = 0;
        this.tutorial_option.anchor.y = 0;
        this.tutorial_option.height = this.menu.height * (1/6);
        this.tutorial_option.width = 200;
        
        this.pvc_option = this.game.add.sprite(0, 0, 'pvc_graphic');
        this.pvc_option.x = this.game.width * (75/320);
        this.pvc_option.y = this.tutorial_option.y + this.menu.height * (1/8);
        this.pvc_option.anchor.x = 0;
        this.pvc_option.anchor.y = 0;
        this.pvc_option.height = this.menu.height * (3/12);
        this.pvc_option.width = this.menu.width * (11/16);
        
        this.pvp_option = this.game.add.sprite(0, 0, 'pvp_graphic');
        this.pvp_option.x = this.game.width * (70/320);
        this.pvp_option.y = this.pvc_option.y + this.menu.height * (1/5);
        this.pvp_option.anchor.x = 0;
        this.pvp_option.anchor.y = 0;
        this.pvp_option.height = this.menu.height * (1/6);
        this.pvp_option.width = 350;
        
        this.settings_option = this.game.add.sprite(0, 0, 'settings_graphic');
        this.settings_option.x = this.game.width * (67/320);
        this.settings_option.y = this.pvp_option.y + this.menu.height * (1/6);
        this.settings_option.anchor.x = 0;
        this.settings_option.anchor.y = 0;
        this.settings_option.height = this.menu.height * (1/6);
        this.settings_option.width = 200;
        
        this.sprite = this.add.sprite(0, 0, 'mm_blob');
        this.sprite.x = this.game.width * (60/320);
        this.sprite.y = this.game.height * (79/224);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.height = this.game.height * (16/224);
        this.sprite.width = this.game.width * (18/320);
        this.sprite.animations.add('wobble');
        this.sprite.animations.play('wobble', 8, true);
        //this.puyo = new Puyo("Red0100", this.game, 10, 10);
        //this.puyo.create();
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.currentPuyoPos = 0;
        
        // Array of menu options for sprite to jump to 
        this.menu_options = [
            this.tutorial_option.y + this.tutorial_option.height * 0.5,
            this.pvc_option.y + this.pvc_option.height * 0.5,
            this.pvp_option.y + this.pvp_option.height * 0.5,
            this.settings_option.y + this.settings_option.height * 0.5
        ];
    },
    
    updateBackground(delta) {
        this.mm_bg2.x -= delta * this.moveSpeed2;
        this.mm_bg2_2.x -= delta * this.moveSpeed2;
        if(this.mm_bg2_2.x < 0)
        {
            this.mm_bg2.x = 0;
            this.mm_bg2_2.x = this.game.width;
        }
        
        this.mm_bg3.x -= delta * this.moveSpeed3;
        this.mm_bg3_2.x -= delta * this.moveSpeed3;
        if(this.mm_bg3_2.x < 0)
        {
            this.mm_bg3.x = 0;
            this.mm_bg3_2.x = this.game.width;
        }    
    
        this.mm_bg4.x -= delta * this.moveSpeed4;
        this.mm_bg4_2.x -= delta * this.moveSpeed4;
        if(this.mm_bg4_2.x < 0)
        {
            this.mm_bg4.x = 0;
            this.mm_bg4_2.x = this.game.width;
        }
        
        this.mm_bg5.x -= delta * this.moveSpeed5;
        this.mm_bg5_2.x -= delta * this.moveSpeed5;
        if(this.mm_bg5_2.x < 0)
        {
            this.mm_bg5.x = 0;
            this.mm_bg5_2.x = this.game.width;
        }
    },
    
    update: function() {
        frameCounter++;
        if (frameCounter == 7) {
            if (this.cursors.down.isDown && this.currentPuyoPos != 3) {
                this.currentPuyoPos++;
            } else if (this.cursors.up.isDown && this.currentPuyoPos != 0) {
                this.currentPuyoPos--;
            } else if (this.enter.isDown) {
                if (this.currentPuyoPos == 0) {
                    this.state.start('TutorialState');
                } else if (this.currentPuyoPos == 1) {
                    this.state.start('CPUState');
                } else if (this.currentPuyoPos == 2) {
                    this.state.start('InGameState');
                } else if (this.currentPuyoPos == 3) {
                    this.state.start('SettingsState');
                }
            }
            frameCounter = 0;
        }
        
        this.sprite.y = this.menu_options[this.currentPuyoPos];
        
        // Move sprite up and down smoothly for show
        var delta = this.game.time.elapsed;
        this.updateBackground(delta);
    },
    
    init: function() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    },
    
    startGame() {
        this.state.start('InGameState');
    }
};
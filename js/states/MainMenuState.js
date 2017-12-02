var PuyoPuyo = PuyoPuyo || {};

var puyo;

var cursors;
var enter;
var frameCounter = 0;
var currentPuyoPos = 0;

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
        this.menu.y = this.game.height / 2  + 10;
        this.menu.anchor.x = 0.5;
        this.menu.anchor.y = 0.5;
        this.menu.height = this.game.height * (150/224);
        this.menu.width = this.game.width * (200/320);
        
        // Add menu options
        this.play_text = this.game.add.text(250, 120, "Play");
        this.play_text.anchor.setTo(0);
        this.play_text.font = 'Chewy';
        this.play_text.fontSize = 45;
        this.play_text.fill = '#364aff';
        this.play_text.stroke = '#000000';
        this.play_text.strokeThickness = 5;
        
        this.tutorial_text = this.game.add.text(250, 170, "Tutorial");
        this.tutorial_text.anchor.setTo(0);
        this.tutorial_text.font = 'Chewy';
        this.tutorial_text.fontSize = 45;
        this.tutorial_text.fill = '#fffb38';
        this.tutorial_text.stroke = '#000000';
        this.tutorial_text.strokeThickness = 5;
        
        this.settings_text = this.game.add.text(250, 230, "Settings");
        this.settings_text.anchor.setTo(0);
        this.settings_text.font = 'Chewy';
        this.settings_text.fontSize = 45;
        this.settings_text.fill = '#790ea3';
        this.settings_text.stroke = '#000000';
        this.settings_text.strokeThickness = 5;
        
        this.exit_text = this.game.add.text(250, 285, "Exit");
        this.exit_text.anchor.setTo(0);
        this.exit_text.font = 'Chewy';
        this.exit_text.fontSize = 45;
        this.exit_text.fill = '#55ff37';
        this.exit_text.stroke = '#000000';
        this.exit_text.strokeThickness = 5;
        
        this.sprite = this.add.sprite(0, 0, 'mm_blob');
        this.sprite.x = this.game.width * (100/320);
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
        this.cursors.down.onDown.add(this.selectDown);
        this.cursors.up.onDown.add(this.selectUp);
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(this.select, this);
        
        // Array of menu options for sprite to jump to 
        this.menu_options = [
            this.play_text.y + this.play_text.height * 0.5,
            this.tutorial_text.y + this.tutorial_text.height * 0.5,
            this.settings_text.y + this.settings_text.height * 0.5,
            this.exit_text.y + this.exit_text.height * 0.5
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
    
    selectDown() {
      if (currentPuyoPos != 3) {
          currentPuyoPos++;
      }
    },
    
    selectUp() {
        if (currentPuyoPos != 0) {
            currentPuyoPos--;
        }
    },
    
    select() {
        if (currentPuyoPos == 0) {
                    this.state.start('InGameState');
                } else if (currentPuyoPos == 1) {
                    this.state.start('TutorialState');
                } else if (currentPuyoPos == 2) {
                    this.state.start('SettingsState');
                } else if (currentPuyoPos == 3) {
                    close();
                }
    },
    
    update: function() {
        this.sprite.y = this.menu_options[currentPuyoPos];
        
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
    },
    
    startTutorial() {
        this.state.start('TutorialState');
    }
};
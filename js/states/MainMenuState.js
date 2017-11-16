var PuyoPuyo = PuyoPuyo || {};

var puyo;

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
        
        this.fake_menu = this.game.add.sprite(0, 0, 'fake_menu');
        this.fake_menu.x = this.game.width / 2 ;
        this.fake_menu.y = this.game.height / 2 ;
        this.fake_menu.anchor.x = 0.5;
        this.fake_menu.anchor.y = 0.5;
        this.fake_menu.height = this.game.height * (160/224);
        this.fake_menu.width = this.game.width * (272/320);
        this.fake_menu.inputEnabled = true;
        this.fake_menu.events.onInputDown.add(this.startGame, this);
        
        this.sprite = this.add.sprite(0, 0, 'mm_blob');
        this.sprite.x = this.game.width * (60/320);
        this.sprite.y = this.game.height * (90/224);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.height = this.game.height * (16/224);
        this.sprite.width = this.game.width * (18/320);
        this.sprite.animations.add('wobble');
        this.sprite.animations.play('wobble', 8, true);
        this.puyo = new Puyo("Red0100", this.game, 10, 10);
        this.puyo.create();
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
        // Move sprite up and down smoothly for show
        var delta = this.game.time.elapsed;
        this.updateBackground(delta);
    },
    
    startGame() {
        this.state.start('InGameState');
    }
};
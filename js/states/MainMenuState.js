var PuyoPuyo = PuyoPuyo || {};

var puyo;

class PuyoSprites {
    constructor() {
        PuyoSprites.nameToIndexTable = {};
        PuyoSprites.indexToName = {};
        
        for(var i = 0; i < 105; i++) {
            var name = "";
            switch(Math.floor(i / 21))
            {
                case 0: name += "Red"; break;
                case 1: name += "Yellow"; break;
                case 2: name += "Green"; break;
                case 3: name += "Blue"; break;
                case 4: name += "Purple"; break;
            }
            //Directions will be coded as follows [Color string][Bottom bool][Top bool][Left bool][Right bool]
            switch(i % 21) {
                case 0: name += "0000"; break;
                case 1: name += "Highlight"; break;
                case 2: name += "Squish"; break;
                case 3: name += "Tall"; break;
                case 4: name += "Die"; break;
                case 5: name += "Flash"; break;
                case 6: name += "0001"; break;
                case 7: name += "0011"; break;
                case 8: name += "0010"; break;
                case 9: name += "1000"; break;
                case 10: name += "1001"; break;
                case 11: name += "1011"; break;
                case 12: name += "1010"; break;
                case 13: name += "1101"; break;
                case 14: name += "1111"; break;
                case 15: name += "1110"; break;
                case 16: name += "1100"; break;
                case 17: name += "0100"; break;
                case 18: name += "0101"; break;
                case 19: name += "0111"; break;
                case 20: name += "0110"; break;
            }
            PuyoSprites.nameToIndexTable[name] = i;
            PuyoSprites.indexToName[i] = name;
        }
    }
    
    static nameToIndex(string) {
        return PuyoSprites.nameToIndexTable[string];
    }
    
    static indexToName(i) {
        return PuyoSprites.indexToName(i);
    }
}

/*class Puyo {
    constructor(name, context) {
        this.frameNum = PuyoSprites.nameToIndex(name);
    }
    
    create(context) {
        this.sprite = context.add.sprite(10, 10, 'puyo');
        this.sprite.frame = this.frameNum;
        this.sprite.animations.add('meow');
        this.sprite.animations.play('meow', 1, true);
    }
    
    changeFrame(name) {
        this.frameNum = PuyoSprites.nameToIndex(name);
        this.sprite.frame = this.frameNum;
    }
};*/

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
        this.puyo = new PuyoPuyo.Puyo(this.game, 10,10, "Red0100", this.pSprites);
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
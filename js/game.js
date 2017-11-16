/* global Phaser */
var PuyoPuyo = PuyoPuyo || {};

class PlayerBoard {
    constructor(game, state) {
        this.game = game
        this.state = state;
    }
    create() {
        var squareBitmap = this.state.add.bitmapData(35 + 4, 35 + 4);
        squareBitmap.ctx.fillStyle = '#000';
        squareBitmap.ctx.fillRect(0, 0, 35 + 4, 35 + 4);
        var i, j, block, square, x, y, data;
        for(i = 0; i < 10; i++) {
            for(j = 0; j < 10; j++) {
                x = 36 + j * (35 + 6);
                y = 150 + i * (35 + 6);
                square = this.state.add.sprite(x, y, squareBitmap);
                square.anchor.setTo(0.5);
                square.alpha = 0.2;
            }
        }
    }
};

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
};

class Puyo {
    constructor(name, game, x, y) {
        this.frameNum = PuyoSprites.nameToIndex(name);
        this.game = game;
        this.x = x;
        this.y = y
    }
    
    create() {
        this.sprite = this.game.add.sprite(this.x, this.y, 'puyo');
        this.sprite.frame = this.frameNum;
        this.sprite.animations.add('meow');
        this.sprite.animations.play('meow', 1, true);
    }
    
    changeFrame(name) {
        this.frameNum = PuyoSprites.nameToIndex(name);
        this.sprite.frame = this.frameNum;
    }
};

PuyoPuyo.game = new Phaser.Game("100", "100", Phaser.AUTO);
PuyoPuyo.game.state.add('PreloadState', PuyoPuyo.PreloadState);
PuyoPuyo.game.state.add('InGameState', PuyoPuyo.InGameState);
PuyoPuyo.game.state.add('MainMenuState', PuyoPuyo.MainMenuState);
PuyoPuyo.game.state.start('PreloadState');

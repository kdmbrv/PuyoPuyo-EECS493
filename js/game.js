/* global Phaser */
var PuyoPuyo = PuyoPuyo || {};

class PlayerBoard {
    constructor(game, state) {
        this.game = game
        this.state = state;
        this.rows = 12;
        this.cols = 6;
        this.puyoVariations = 5;
        this.grid = [];
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.horizontalLock = false;
        this.verticalLock = false;
        for(var i = 0; i < this.rows; i++) {
            this.grid.push([]);
            for(var j = 0; j < this.cols; j++) {
                this.grid[i].push(0);
            }
        }
    }
    create() {
        this.spawnNewPuyo();
    }
    print() {
        var formatString = '';
        formatString += '\n';

        for(var i = 0; i < this.rows; i++) {
            formatString += '\n';
            for(var j = 0; j < this.cols; j++) {
                formatString += ' ' + this.grid[i][j];
            }
        }
        console.log(formatString);
    }
    checkGameOver() {
        if(this.grid[0][2] != 0) {
            console.log("game over");
        }
    }
    spawnNewPuyo() {
        console.log("spawning");
        console.log(this.grid[0][2]);
        this.game.time.events.remove(this.movementTimer);
        this.checkGameOver();
        this.puyo1 = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.puyo1x = 2;
        this.puyo1y = 0
        this.grid[0][2] = this.puyo1;
        this.movementTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.movePuyo, this);
        this.print();
    }
    checkIfPlaced() {
        this.print();
        if(this.puyo1y == this.rows-1 || this.grid[this.puyo1y+1][this.puyo1x] != 0) {
            this.game.time.events.remove(this.movementTimer);
            this.spawnTimer = this.game.time.events.add(Phaser.Timer.SECOND, this.spawnNewPuyo, this);
        }
    }
    movePuyo() {
        this.grid[this.puyo1y][this.puyo1x] = 0;
        this.puyo1y++;
        this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
        this.print();
        this.checkIfPlaced();
    }
    canMoveLeft() {
        if(this.leftKey.isDown && this.puyo1x > 0 && this.grid[this.puyo1y][this.puyo1x-1] === 0 && !this.horizontalLock) {
            return true;
        }
    }
    canMoveRight() {
        if(this.rightKey.isDown && this.puyo1x < 5 && this.grid[this.puyo1y][this.puyo1x+1] === 0 && !this.horizontalLock) {
            return true;
        }
    }
    update() {
        if (this.canMoveLeft()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.puyo1x--;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.horizontalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockHorizontalMovement, this);
            this.checkIfPlaced();
        }
        if (this.canMoveRight()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.puyo1x++;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.horizontalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockHorizontalMovement, this);
            this.checkIfPlaced();
        }
        /*if (this.downKey.isDown && this.puyo1y < 11  && !this.verticalLock) {
            console.log("down");
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.puyo1y++;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.verticalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockVerticalMovement, this);
            this.game.time.events.remove(this.movementTimer);
            this.movementTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.movePuyo, this);
            this.checkIfPlaced();
        }*/
    }
    unlockHorizontalMovement() {
        this.horizontalLock = false;
    }
    unlockVerticalMovement() {
        this.verticalLock = false;
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

PuyoPuyo.game = new Phaser.Game("100", "100", Phaser.AUTO, '', '', false, false);
PuyoPuyo.game.state.add('PreloadState', PuyoPuyo.PreloadState);
PuyoPuyo.game.state.add('InGameState', PuyoPuyo.InGameState);
PuyoPuyo.game.state.add('MainMenuState', PuyoPuyo.MainMenuState);
PuyoPuyo.game.state.start('PreloadState');


//When press a button, lock any input for a sec then unlock it
//for left press, when press it, lock it for a 5th of a second then unlock it
//for update, check for press and not locked
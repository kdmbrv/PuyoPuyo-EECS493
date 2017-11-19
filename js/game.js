/* global Phaser */
var PuyoPuyo = PuyoPuyo || {};

//TODO: Functions To Change for 2 Block
//canMoveDown

class PlayerBoard {
    constructor(game, state) {
        this.game = game
        this.state = state;
        this.rows = 12;
        this.cols = 6;
        this.puyoVariations = 5;
        this.grid = [];
        this.gameOver = false;
        this.pairIsVertical = true;
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
    GameOver() {
        if(this.grid[1][2] != 0) {
            console.log("game over");
            return true;
        }
        return false;
    }
    prepareSpawn() {
        this.game.time.events.remove(this.movementTimer);
        this.game.time.events.remove(this.timer);
        this.spawnTimer = this.game.time.events.add(Phaser.Timer.SECOND, this.spawnNewPuyo, this);
        this.horizontalLock = true;
        this.verticalLock = true;
        this.print();
    }
    spawnNewPuyo() {
        this.horizontalLock = false;
        this.verticalLock = false;
        if(this.GameOver()) {
            this.gameOver = true;
            return;
        }
        this.puyo1 = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.puyo2 = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.puyo1x = 2;
        this.puyo1y = 0
        this.puyo2x = 2;
        this.puyo2y = 1;
        this.grid[0][2] = this.puyo1;
        this.grid[1][2] = this.puyo2;
        this.movementTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.movePuyo, this);
        this.print();
    }
    movePuyo() {
        if(this.puyo2y == this.rows-1 || this.grid[this.puyo2y+1][this.puyo2x] != 0) {
            //lock movement and spawn
            this.prepareSpawn();
            this.findChains();
        }
        else {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1y++;
            this.puyo2y++;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.print();
        }
    }
    canMoveLeft() {
        if(!this.leftKey.isDown || this.horizontalLock) {
            return false;
        }
        else if(this.pairIsVertical) {
            if(this.puyo1x > 0 
            && this.puyo2x > 0
            && this.grid[this.puyo1y][this.puyo1x-1] === 0 
            && this.grid[this.puyo2y][this.puyo2x-1] === 0) {
                return true;
            }
        }
        else {
            if(this.puyo1x < this.puyo2x) {
                if(this.puyo1x > 0
                && this.grid[this.puyo1y][this.puyo1x-1] === 0) {
                    return true;
                }
            }
            else {
                if(this.puyo2x > 0
                && this.grid[this.puyo2y][this.puyo2x-1] === 0) {
                    return true;
                }
            }
        }
    }
    canMoveRight() {
        if(!this.rightKey.isDown || this.horizontalLock) {
            return false;
        }
        else if(this.pairIsVertical) {
            if(this.puyo1x < this.cols-1 
            && this.puyo2x < this.cols-1
            && this.grid[this.puyo1y][this.puyo1x+1] === 0 
            && this.grid[this.puyo2y][this.puyo2x+1] === 0) {
                return true;
            }
        }
        else {
            if(this.puyo1x < this.puyo2x) {
                if(this.puyo1x < this.cols-1
                && this.grid[this.puyo1y][this.puyo1x+1] === 0) {
                    return true;
                }
            }
            else {
                if(this.puyo2x < this.cols-1
                && this.grid[this.puyo2y][this.puyo2x+1] === 0) {
                    return true;
                }
            }
        }
    }
    canMoveDown() {
        if(!this.downKey.isDown || this.verticalLock) {
            return false;
        }
        else if(this.pairIsVertical) {
            if(this.puyo1y > this.puyo2y) {
                if(this.puyo1y < this.rows-1
                && this.grid[this.puyo1y+1][this.puyo1x] === 0) {
                    return true;
                }
                else if(this.puyo1y < this.rows-1
                && this.grid[this.puyo1y+1][this.puyo1x] != 0) {
                    this.prepareSpawn();
                    this.findChains();
                    return false;
                }
            }
            else {
                if(this.puyo2y < this.rows-1
                && this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                    return true;
                }
                else if(this.puyo2y < this.rows-1
                && this.grid[this.puyo2y+1][this.puyo2x] != 0) {
                    this.prepareSpawn();
                    this.findChains();
                    return false;
                }
            }
        }
        else {
            if(this.puyo1y < this.rows-1
            && this.puyo2y < this.rows-1
            && this.grid[this.puyo1y+1][this.puyo1x] === 0
            && this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                return true;
            }
            else if(this.puyo1y < this.rows-1
            && this.puyo2y < this.rows-1
            && (this.grid[this.puyo1y+1][this.puyo1x] != 0
            || this.grid[this.puyo2y+1][this.puyo2x] != 0)) {
                this.prepareSpawn();
                this.findChains();
                return false;
            }
        }
    }
    update() {
        if (!this.gameOver && this.canMoveLeft()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1x--;
            this.puyo2x--;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.horizontalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockHorizontalMovement, this);
            this.print();
        }
        else if (!this.gameOver && this.canMoveRight()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1x++;
            this.puyo2x++;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.horizontalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockHorizontalMovement, this);
            this.print();
        }
        else if (!this.gameOver && this.canMoveDown()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1y++;
            this.puyo2y++;
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.verticalLock = true;
            this.timer = this.game.time.events.add(Phaser.Timer.SECOND/10, this.unlockVerticalMovement, this);
            this.game.time.events.remove(this.movementTimer);
            this.print();
        }
    }
    findChains() {
        //some kind of recursive formula
        //some array that tracks if you've gone over that point
        //
        this.checkedGrid = [];
        for(var i = 0; i < this.rows; i++) {
            this.checkedGrid.push([]);
            for(var j = 0; j < this.cols; j++) {
                this.checkedGrid[i].push(0);
            }
        }
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(this.grid[i][j] != 0) {
                    this.findChainsHelper(j, i, this.grid[i][j]);
                }
            }
        }
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(this.checkedGrid[i][j] >= 4) {
                    this.deleteChain(j,i,this.grid[i][j]);
                }
            }
        }
        this.dropAllBlocks();
    }
    findChainsHelper(x, y, variation) {
        if(x < 0 || x >= this.cols) {
            return 0;
        }
        else if(y < 0 || y >= this.rows) {
            return 0;
        }
        else if(this.checkedGrid[y][x] != 0) {
            return 0;
        }
        else if(this.grid[y][x] != variation) {
            return 0;
        }
        this.checkedGrid[y][x] = 1;
        this.checkedGrid[y][x] = this.checkedGrid[y][x] + this.findChainsHelper(x,y-1,variation) + this.findChainsHelper(x,y+1,variation) + this.findChainsHelper(x-1,y,variation) + this.findChainsHelper(x+1,y,variation);
        return this.checkedGrid[y][x];
    }
    deleteChain(x,y,variation) {
        if(x < 0 || x >= this.cols) {
            return;
        }
        else if(y < 0 || y >= this.rows) {
            return;
        }
        else if(this.grid[y][x] != variation) {
            return;
        }
        this.checkedGrid[y][x] = 0;
        this.grid[y][x] = 0;
        this.deleteChain(x+1,y,variation);
        this.deleteChain(x-1,y,variation);
        this.deleteChain(x,y+1,variation);
        this.deleteChain(x,y-1,variation);
    }
    dropAllBlocks() {
        for(var i = this.rows-2; i >= 0; i--) {
            for(var j = 0; j < this.cols; j++) {
                if(this.grid[i][j] != 0 && this.grid[i+1][j] === 0) {
                    this.dropBlock(j,i);
                }
            }
        }
    }
    dropBlock(x,y) {
        let newY = y+1;
        while(newY < this.rows-1 && this.grid[newY][x] === 0) {
            newY++;
        }
        if(newY == this.rows-1 && this.grid[newY][x] === 0) {
            //do nothing
        }
        else {
            newY--;
        }
        let variation = this.grid[y][x];
        this.grid[y][x] = 0;
        this.grid[newY][x] = variation;
    }
    unlockHorizontalMovement() {
        this.horizontalLock = false;
    }
    unlockVerticalMovement() {
        this.verticalLock = false;
        this.movementTimer = this.game.time.events.loop(Phaser.Timer.SECOND, this.movePuyo, this);
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

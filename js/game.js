/* global Phaser */
var PuyoPuyo = PuyoPuyo || {};
var chainPower = [0, 8, 16, 32, 64, 128, 256, 512, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999];
var colorBonus = [0, 3, 6, 12, 24]; // red, blue, green, purple, yellow
var groupBonus = [0, 2, 3, 4, 5, 6, 7, 10];

class testBlob {
    constructor(row, col, variation, game, rowHeight, colWidth) {
        this.row = row;
        this.col = col;
        this.variation = variation;
        this.game = game;
        this.rowHeight = rowHeight;
        this.colWidth = colWidth;
        if(variation == 1) {
            this.src = "redCircle";
        }
        else if(variation == 2) {
            this.src = "blueCircle";
        }
        else if(variation == 3) {
            this.src = "greenCircle";
        }
        else if(variation == 4) {
            this.src = "purpleCircle";
        }
        else if(variation == 5) {
            this.src = "yellowCircle";
        }
        else if(variation == 6) {
            this.src = "whiteCircle";
        }
    }
    
    create(x, y) {
        this.blob = this.game.add.sprite(x,y,this.src);
    }
    
    moveLeft() {
        this.blob.x -= this.colWidth;
    }
    
    moveRight() {
        this.blob.x += this.colWidth;
    }
    
    moveDown() {
        this.blob.y += this.rowHeight;
    }
    
    rotateLeft(type) {
        //x++, y--
        if(type == 0) {
            this.blob.x += this.colWidth;
            this.blob.y -= this.rowHeight; 
        }
        //x--, y++
        else if(type == 1) {
            this.blob.x -= this.colWidth;
            this.blob.y += this.rowHeight;
        }
        //x--, y--
        else if(type == 2) {
            this.blob.x -= this.colWidth;
            this.blob.y -= this.rowHeight;
        }
        //x++, y++
        else if(type == 3) {
            this.blob.x += this.colWidth;
            this.blob.y += this.rowHeight;
        }
    }
    
    rotateRight(type) {
        //x--, y--
        if(type == 0) {
            this.blob.x -= this.colWidth;
            this.blob.y -= this.rowHeight; 
        }
        //x++, y++
        else if(type == 1) {
            this.blob.x += this.colWidth;
            this.blob.y += this.rowHeight;
        }
        //x--, y++
        else if(type == 2) {
            this.blob.x -= this.colWidth;
            this.blob.y += this.rowHeight;
        }
        //x++, y--
        else if(type == 3) {
            this.blob.x += this.colWidth;
            this.blob.y -= this.rowHeight;
        }
    }
    drop(numSpacesDropped) {
        this.blob.y += numSpacesDropped*this.rowHeight;
    }
    destroy() {
        this.blob.destroy();
    }
};

//TODO: split timer into seperate timers
//rotationTimer
//horizontalTimer
//vertical timer
class PlayerBoard {
    //Eventually want to pass in the size and coords for where the board will be placed
    //I believe so that the logic for the InGameState just has to worry about passing in
    //the right numbers... may be wrong though
    constructor(game, state, xOffset, leftKey, rightKey, downKey, rotateLKey, rotateRKey, player1) {
        this.game = game
        this.state = state;
        this.grid = [];
        this.blobGrid = [];
        this.gameOver = false;
        this.pairIsVertical = true;
        this.leftKey = game.input.keyboard.addKey(leftKey);
	    this.rightKey = game.input.keyboard.addKey(rightKey);
	    this.downKey = game.input.keyboard.addKey(downKey);
	    this.rotateLKey = game.input.keyboard.addKey(rotateLKey);
	    this.rotateRKey = game.input.keyboard.addKey(rotateRKey);
        this.horizontalLock = false;
        this.rotateLock = false;
        this.verticalLock = false;
        this.nuisanceCount = 0;
        this.nuisancePoint = 1;
        this.player1 = player1;
        this.nextNuisanceCol = 0;
        
        //constants
        this.rows = 12;
        this.cols = 6;
        this.puyoVariations = 5;
        this.colWidth = 34;
        this.rowHeight = 34;
        this.xOffset = xOffset;
        this.yOffset = 20;
        this.width = 204 // example;
        this.height = 408 // example;
        
        //timer Constants
        this.horizontalLockTimerConstant = Phaser.Timer.SECOND/10;
	    this.verticalLockTimerConstant = Phaser.Timer.SECOND/10;
	    this.rotationLockTimerConstant = Phaser.Timer.SECOND/5;
	    this.autoDownwardTimerConstant = Phaser.Timer.SECOND/this.game.global['gameDifficulty'];
	    this.spawnTimerConstant = Phaser.Timer.SECOND;
        
        //Draw Boards
        var board;
        var bmd = this.game.add.bitmapData(this.width, this.height);
        
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.width, this.height);
        bmd.ctx.fillStyle = '#CD853F';
        bmd.ctx.fill();
        board = this.game.add.sprite(xOffset, this.yOffset, bmd);
        // this.backgroundWall = this.game.add.tileSprite(this.xOffset,this.yOffset,this.width, this.height, '#ffffff');
        // this.backgroundWall = this.game.add.tileSprite(this.xOffset,this.yOffset,this.width, this.height, 'brick_wall_dark');
        for(var i = 0; i < this.rows; i++) {
            this.grid.push([]);
            this.blobGrid.push([]);
            for(var j = 0; j < this.cols; j++) {
                this.grid[i].push(0);
                this.blobGrid.push(new testBlob(null,null,null,null,null));
            }
        }
        
        // Set next blob colors
        this.nextBlob1Color = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.nextBlob2Color = Math.floor(Math.random() * this.puyoVariations) + 1;
        
        // Score variable
        this.score = 0;
    }
    
    //Spawn first pair
    create() {
        this.spawnNewPuyo();
    }
    
    incrementNuisanceCount(num) {
        console.log(num);
        this.nuisanceCount += num;
        console.log(this.nuisanceCount);
    }
    
    //Prints the game board in the console
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
    
    //Check if the game is over
    GameOver() {
        if(this.grid[1][2] != 0) {
            console.log("game over");
            return true;
        }
        return false;
    }
    
    //Halts timers and locks movement in preparation for next spawn
    prepareSpawn() {
        this.game.time.events.remove(this.movementTimer);
        this.game.time.events.remove(this.horizontalTimer);
        this.game.time.events.remove(this.verticalTimer);
        this.game.time.events.remove(this.rotationTimer);
        this.horizontalLock = true;
        this.verticalLock = true;
        this.rotateLock = true;
        this.findChains();
        this.dropNuisance();
        this.spawnTimer = this.game.time.events.add(this.spawnTimerConstant, this.spawnNewPuyo, this);
        this.print();
    }
    
    // New random color variable for next 
    newNextColor() {
        if (this.gameOver) {
            return;
        }
        this.nextBlob1Color = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.nextBlob2Color = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.state.updateNextBlobs();
    }
    
    pauseGame() {
        this.game.time.events.pause(this.verticalTimer);
        this.game.time.events.pause(this.horizontalTimer);
        this.game.time.events.pause(this.rotationTimer);
        this.game.time.events.pause(this.movementTimer);
        this.game.time.events.pause(this.spawnTimer);
    }
    
    resumeGame() {
        this.game.time.events.resume(this.verticalTimer);
        this.game.time.events.resume(this.horizontalTimer);
        this.game.time.events.resume(this.rotationTimer);
        this.game.time.events.resume(this.movementTimer);
        this.game.time.events.resume(this.spawnTimer);
    }
    
    //Spawn a new pair of blobs
    spawnNewPuyo() {
        if (this.gameOver) {
            return;
        }
        this.horizontalLock = false;
        this.verticalLock = false;
        this.rotateLock = false;
        if(this.GameOver()) {
            this.gameOver = true;
            return;
        }
        this.pairIsVertical = true;
        //this.puyo1 = Math.floor(Math.random() * this.puyoVariations) + 1;
        //this.puyo2 = Math.floor(Math.random() * this.puyoVariations) + 1;
        this.puyo1 = this.nextBlob1Color;
        this.puyo2 = this.nextBlob2Color;
        this.newNextColor();
        this.puyo1x = 2;
        this.puyo1y = 0
        this.puyo2x = 2;
        this.puyo2y = 1;
        this.grid[0][2] = this.puyo1;
        this.grid[1][2] = this.puyo2;
        this.blob1 = new testBlob(0,2, this.puyo1, this.game, this.rowHeight, this.colWidth);
        this.blob2 = new testBlob(1,2,this.puyo2, this.game, this.rowHeight, this.colWidth);
        this.blobGrid[0][2] = this.blob1;
        this.blobGrid[1][2] = this.blob2;
        this.blob1.create(this.xOffset + 2*this.colWidth, this.yOffset);
        this.blob2.create(this.xOffset + 2*this.colWidth, this.yOffset + this.rowHeight);
        this.movementTimer = this.game.time.events.loop(this.autoDownwardTimerConstant, 
                                                                    this.movePuyo, this);
        this.print();
    }
    
    //Automatic downward movement of blob every second(default)
    movePuyo() {
        if (this.gameOver) {
            return;
        }
        if(this.pairIsVertical) {
            if(this.puyo1y < this.puyo2y) {
                if(this.puyo2y == this.rows-1 || this.grid[this.puyo2y+1][this.puyo2x] != 0) {
                    //lock movement and spawn
                    this.prepareSpawn();
                    return;
                }
            }
            else {
                if(this.puyo1y == this.rows-1 || this.grid[this.puyo1y+1][this.puyo1x] != 0) {
                    //lock movement and spawn
                    this.prepareSpawn();
                    return;
                }
            }
        }
        else {
            console.log("horizontal")
            //if on the bottom or one doesn not equal 0
            if(this.puyo1y == this.rows-1) {
                console.log("bottom");
                this.prepareSpawn();
                return;
            }
            else if (this.grid[this.puyo1y+1][this.puyo1x] != 0
            || this.grid[this.puyo2y+1][this.puyo2x] != 0){
                console.log("1");
                if(this.grid[this.puyo1y+1][this.puyo1x] === 0) {
                    console.log("2");
                    this.dropBlock(this.puyo1x, this.puyo1y);
                    this.prepareSpawn();
                    return;
                }
                else if(this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                    console.log("3");
                    this.dropBlock(this.puyo2x, this.puyo2y);
                    this.prepareSpawn();
                    return;
                }
                //BUG FIX: Originally did not account for if both blobs have something underneath them
                else {
                    this.prepareSpawn();
                    return;
                }
            }
        }
        this.grid[this.puyo1y][this.puyo1x] = 0;
        this.grid[this.puyo2y][this.puyo2x] = 0;
        this.puyo1y++;
        this.puyo2y++;
        this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
        this.blobGrid[this.puyo2y][this.puyo2x] = this.blob2;
        this.blob1.moveDown();
        this.blob2.moveDown();
        this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
        this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
        this.print();
    }
    
    //Checks to see if the blob pair can rotate left
    canRotateLeft() {
        if(!this.rotateLKey.isDown || this.rotateLock) {
            return false;
        }
        if(this.pairIsVertical) {
            if(this.puyo1y > this.puyo2y) {
                if(this.puyo1x == this.cols-1) {
                    return false;
                }
                if(this.grid[this.puyo1y][this.puyo1x+1] === 0 
                && this.grid[this.puyo2y][this.puyo2x+1] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x++;
                    this.puyo1y--;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateLeft(0);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = false;
                    return true;
                }
                return false;
            }
            else {
                if(this.puyo1x === 0) {
                    return false;
                }
                if(this.grid[this.puyo1y][this.puyo1x-1] === 0 
                && this.grid[this.puyo2y][this.puyo2x-1] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x--;
                    this.puyo1y++;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateLeft(1);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = false;
                    return true;
                }
                return false;
            }
        }
        else {
            if(this.puyo1x > this.puyo2x) {
                if(this.puyo1y === 0) {
                    return false;
                }
                if(this.grid[this.puyo1y-1][this.puyo1x] === 0 
                && this.grid[this.puyo2y-1][this.puyo2x] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x--;
                    this.puyo1y--;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateLeft(2);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = true;
                    return true;
                }
                return false;
            }
            else {
                if(this.puyo1y == this.rows-1) {
                    return false;
                }
                if(this.grid[this.puyo1y+1][this.puyo1x] === 0 
                && this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x++;
                    this.puyo1y++;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateLeft(3);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = true;
                    return true;
                }
                return false;
            }
        }
    }
    
    //Checks if the blob pair can rotate right
    canRotateRight() {
        if(!this.rotateRKey.isDown || this.rotateLock) {
            return false;
        }
        if(this.pairIsVertical) {
            if(this.puyo1y > this.puyo2y) {
                if(this.puyo1x === 0) {
                    return false;
                }
                if(this.grid[this.puyo1y][this.puyo1x-1] === 0 
                && this.grid[this.puyo2y][this.puyo2x-1] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x--;
                    this.puyo1y--;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateRight(0);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = false;
                    return true;
                }
                return false;
            }
            else {
                if(this.puyo1x == this.cols-1) {
                    return false;
                }
                if(this.grid[this.puyo1y][this.puyo1x+1] === 0 
                && this.grid[this.puyo2y][this.puyo2x+1] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x++;
                    this.puyo1y++;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateRight(1);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = false;
                    return true;
                }
                return false;
            }
        }
        else {
            if(this.puyo1x > this.puyo2x) {
                if(this.puyo1y == this.rows-1) {
                    return false;
                }
                if(this.grid[this.puyo1y+1][this.puyo1x] === 0 
                && this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x--;
                    this.puyo1y++;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateRight(2);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = true;
                    return true;
                }
                return false;
            }
            else {
                if(this.puyo1y === 0) {
                    return false;
                }
                if(this.grid[this.puyo1y-1][this.puyo1x] === 0 
                && this.grid[this.puyo2y-1][this.puyo2x] === 0) {
                    this.grid[this.puyo1y][this.puyo1x] = 0;
                    this.puyo1x++;
                    this.puyo1y--;
                    this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
                    this.blob1.rotateRight(3);
                    this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
                    this.pairIsVertical = true;
                    return true;
                }
                return false;
            }
        }
    }
    
    //Checks if the blob pair can move left
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
    
    //Checks if the blob pair can move right
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
                if(this.puyo2x < this.cols-1
                && this.grid[this.puyo2y][this.puyo2x+1] === 0) {
                    return true;
                }
            }
            else {
                if(this.puyo1x < this.cols-1
                && this.grid[this.puyo1y][this.puyo1x+1] === 0) {
                    return true;
                }
            }
        }
    }
    
    //Checks if the blob pair can manually move down
    //Resets automatic downward movement timer
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
                    return false;
                }
                else if(this.puyo1y == this.rows-1) {
                    this.prepareSpawn();
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
                    return false;
                }
                else if(this.puyo2y == this.rows-1) {
                    this.prepareSpawn();
                    return false;
                }
            }
        }
        else {
            if(this.puyo1y < this.rows-1
            && this.grid[this.puyo1y+1][this.puyo1x] === 0
            && this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                return true;
            }
            else if(this.puyo1y < this.rows-1
            && (this.grid[this.puyo1y+1][this.puyo1x] != 0
            || this.grid[this.puyo2y+1][this.puyo2x] != 0)) {
                //If a block is hanging, drop it
                if(this.grid[this.puyo1y+1][this.puyo1x] === 0) {
                    this.dropBlock(this.puyo1x, this.puyo1y);
                }
                else if(this.grid[this.puyo2y+1][this.puyo2x] === 0) {
                    this.dropBlock(this.puyo2x, this.puyo2y);
                }
                this.prepareSpawn();
                return false;
            }
            else if(this.puyo1y == this.rows-1) {
                this.prepareSpawn();
                return false;
            }
        }
    }
    
    updateScore(groupNum, color) {
        var PC = groupNum;
        var CP = chainPower[groupNum - 1];
        var CB = colorBonus[color - 1];
        var GB = groupBonus[groupNum - 1];

        this.score += (10 * PC) * (CP + CB + GB);
        this.state.updateScore();
    }
    
    // Drop nuisance
    dropNuisanceNum(groupNum) {
        var SC = chainPower[groupNum];
        var TP = 70;
        var NL = this.nuisancePoint; 
        this.nuisancePoint = SC/TP + NL;
        var NC = Math.floor(this.nuisancePoint);
        this.nuisancePoint = this.nuisancePoint - NC;

        return NC;
        //Doing this until we figure out what nuisancePoint is
        //return Math.floor(Math.random() * 5) + 1  
    }
    
    dropNuisance() {
        //This function allows for only spawning clear blobs in the first 2 rows
        //If can't spawn enough in those 2 rows then you just ignore the rest
        console.log("dropping " + this.nuisanceCount + " clear blobs");
        
        //Max number of blocks to drop
        let numToDrop = this.nuisanceCount;
        
        //Num cols that have been skipped in the spawning process so far
        //If this number reaches the number of cols, then no other col is 
        //eligible for spawning clear blobs
        //Thus, break out of the loop and drop that clear blobs you have spawned
        let colsSkipped = 0;
        
        //Loop to find where to spawn the clear blobs
        //Could actually just get rid of the skipped varialbe and use a fro loop from 0 to 5...
        //but its almost 2:30 and I shleep
        while(numToDrop != 0) {
            //No more eligible cols to spawn clear blobs
            if(colsSkipped == this.cols) {
                break;
            }
            
            //Can place clear blob in first row
            if(this.grid[0][this.nextNuisanceCol] === 0) {
                this.grid[0][this.nextNuisanceCol] = 6;
                this.nuisanceBlob = new testBlob(0,this.nextNuisanceCol, 6, this.game, this.rowHeight, this.colWidth);
                this.blobGrid[0][this.nextNuisanceCol] = this.nuisanceBlob;
                this.nuisanceBlob.create(this.xOffset + this.nextNuisanceCol*this.colWidth, this.yOffset);
                colsSkipped = 0;
                numToDrop--;
            }
            
            //Can place blob in second row
            else if(this.grid[0][this.nextNuisanceCol] == 6 && this.grid[1][this.nextNuisanceCol] === 0) {
                this.grid[1][this.nextNuisanceCol] = 6;
                this.nuisanceBlob = new testBlob(1,this.nextNuisanceCol, 6, this.game, this.rowHeight, this.colWidth);
                this.blobGrid[1][this.nextNuisanceCol] = this.nuisanceBlob;
                this.nuisanceBlob.create(this.xOffset + this.nextNuisanceCol*this.colWidth, this.yOffset + this.rowHeight);
                colsSkipped = 0;
                numToDrop--;
            }
            
            //Can't place a blob in this column
            else {
                colsSkipped++;
            }
            
            //increment the next column to drop a clear blob in
            this.nextNuisanceCol++;
            this.nextNuisanceCol = this.nextNuisanceCol % this.cols;
        }
        
        for(var i = 0; i < this.cols; i++) {
            if(this.grid[1][i] == 6) {
                this.dropBlock(i,1);
            }
        }
        for(var i = 0; i < this.cols; i++) {
            if(this.grid[0][i] == 6) {
                this.dropBlock(i,0);
            }
        }
        this.nuisanceCount = 0;
    }
    
        //Checks game board for chains
    findChains() {
        this.checkedGrid = [];
        for(var i = 0; i < this.rows; i++) {
            this.checkedGrid.push([]);
            for(var j = 0; j < this.cols; j++) {
                this.checkedGrid[i].push(0);
            }
        }
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                //Should avoid finding chains for clear blobs
                if(this.grid[i][j] != 0 && this.grid[i][j] != 6) {
                    let count = this.findChainsHelper(j, i, this.grid[i][j]);
                    //Placing the updateScore here will return the correct chain length... I believe :)
                    //Placing it during the deletion loop could return a lower number if the chain
                    //length was greater than 4
                    if(count > 3) {
                        this.updateScore(count, this.grid[i][j]);
                        if(this.player1) {
                            this.state.player2Board.incrementNuisanceCount(this.dropNuisanceNum(count));
                        }
                        else {
                            this.state.player1Board.incrementNuisanceCount(this.dropNuisanceNum(count));
                        }
                    }
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
        if(this.dropAllBlocks()) {
            this.findChains();
        }
    }
    
    //Recursive helper function to help check for chains
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
        this.checkedGrid[y][x] = this.checkedGrid[y][x] 
                                + this.findChainsHelper(x,y-1,variation) 
                                + this.findChainsHelper(x,y+1,variation) 
                                + this.findChainsHelper(x-1,y,variation) 
                                + this.findChainsHelper(x+1,y,variation);
        return this.checkedGrid[y][x];
    }
    
    //Recrusive function to delete chains
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
        this.blobGrid[y][x].destroy();
        
        //Checks if there is a clear blob nearby and if there is, destroy it
        //Currently destroys clear blobs on any side of the curr blob
        //Not sure if this is exactly how it is in the other games
        //If not just delete the corresponding logic statements
        if(y+1 < this.rows && this.grid[y+1][x] == 6) {
            this.checkedGrid[y+1][x] = 0;
            this.grid[y+1][x] = 0;
            this.blobGrid[y+1][x].destroy();
        }
        if(y-1 > -1 && this.grid[y-1][x] == 6) {
            this.checkedGrid[y-1][x] = 0;
            this.grid[y-1][x] = 0;
            this.blobGrid[y-1][x].destroy();
        }
        if(x-1 > -1 && this.grid[y][x-1] == 6) {
            this.checkedGrid[y][x-1] = 0;
            this.grid[y][x-1] = 0;
            this.blobGrid[y][x-1].destroy();
        }
        if(x+1 < this.cols && this.grid[x+1] == 6) {
            this.checkedGrid[y][x+1] = 0;
            this.grid[y][x+1] = 0;
            this.blobGrid[y][x+1].destroy();
        }
        
        this.deleteChain(x+1,y,variation);
        this.deleteChain(x-1,y,variation);
        this.deleteChain(x,y+1,variation);
        this.deleteChain(x,y-1,variation);
    }
    
    //Drops all hanging blocks after deletion of chains
    //Also returns true if a block is dropped, meaning 
    //that a chain was deleted, which means there could 
    //be new chains, and the finding chains process will
    //bre repeated
    dropAllBlocks() {
        var droppedBlock = false;
        for(var i = this.rows-2; i >= 0; i--) {
            for(var j = 0; j < this.cols; j++) {
                if(this.grid[i][j] != 0 && this.grid[i+1][j] === 0) {
                    this.dropBlock(j,i);
                    droppedBlock = true;
                }
            }
        }
        return droppedBlock;
    }
    
    //Drops a block with given x and y coords
    dropBlock(x,y) {
        console.log(x + " " + y);
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
        this.blobGrid[newY][x] = this.blobGrid[y][x];
        this.blobGrid[y][x].drop(newY-y);
        this.print();
    }
    
    unlockHorizontalMovement() {
        this.horizontalLock = false;
    }
    
    unlockVerticalMovement() {
        this.verticalLock = false;
        this.movementTimer = this.game.time.events.loop(this.autoDownwardTimerConstant, 
                                                                    this.movePuyo, this);
    }
    
    unlockRotation() {
        this.rotateLock = false;
    }
    
    //Called many times per second to check for keyboard inputs
    update() {
        if (!this.gameOver && this.canMoveLeft()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1x--;
            this.puyo2x--;
            this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
            this.blobGrid[this.puyo2y][this.puyo2x] = this.blob2;
            this.blob1.moveLeft();
            this.blob2.moveLeft();
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.horizontalLock = true;
            this.horizontalTimer = this.game.time.events.add(this.horizontalLockTimerConstant, 
                                                    this.unlockHorizontalMovement, this);
            this.print();
        }
        else if (!this.gameOver && this.canMoveRight()) {
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1x++;
            this.puyo2x++;
            this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
            this.blobGrid[this.puyo2y][this.puyo2x] = this.blob2;
            this.blob1.moveRight();
            this.blob2.moveRight();
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.horizontalLock = true;
            this.horizontalTimer = this.game.time.events.add(this.horizontalLockTimerConstant, 
                                                    this.unlockHorizontalMovement, this);
            this.print();
        }
        else if (!this.gameOver && this.canMoveDown()) {
            this.score += 10;
            this.state.updateScore();
            this.grid[this.puyo1y][this.puyo1x] = 0;
            this.grid[this.puyo2y][this.puyo2x] = 0;
            this.puyo1y++;
            this.puyo2y++;
            this.blobGrid[this.puyo1y][this.puyo1x] = this.blob1;
            this.blobGrid[this.puyo2y][this.puyo2x] = this.blob2;
            this.blob1.moveDown();
            this.blob2.moveDown();
            this.grid[this.puyo1y][this.puyo1x] = this.puyo1;
            this.grid[this.puyo2y][this.puyo2x] = this.puyo2;
            this.verticalLock = true;
            this.verticalTimer = this.game.time.events.add(this.verticalLockTimerConstant, 
                                                    this.unlockVerticalMovement, this);
            this.game.time.events.remove(this.movementTimer);
            this.print();
        }
        else if(!this.gameOver && this.canRotateLeft()) {
            this.rotateLock = true;
            this.rotationTimer = this.game.time.events.add(this.rotationLockTimerConstant, 
                                                        this.unlockRotation, this);
            this.print();
        }
        else if(!this.gameOver && this.canRotateRight()) {
            this.rotateLock = true;
            this.rotationTimer = this.game.time.events.add(this.rotationLockTimerConstant, 
                                                        this.unlockRotation, this);
            this.print();
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
    }
    
    changeFrame(name) {
        this.frameNum = PuyoSprites.nameToIndex(name);
        this.sprite.frame = this.frameNum;
    }
};

WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { console.log("loaded fonts"); },
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Berkshire+Swash', 'Press+Start+2P', 'Chewy']
    }
};

PuyoPuyo.game = new Phaser.Game(650, 450, Phaser.AUTO, '', '', false, false);

//Set Initial Controls
PuyoPuyo.game.global = {
    'gameDifficultyIndex' : 1,
    'gameDifficulty' : 1,
    'player1LeftKey' : Phaser.Keyboard.A,
    'player1RightKey' : Phaser.Keyboard.D,
    'player1DownKey' : Phaser.Keyboard.S,
    'player1RotateLKey' : Phaser.Keyboard.C,
    'player1RotateRKey' : Phaser.Keyboard.V,
    'player2LeftKey' : Phaser.Keyboard.LEFT,
    'player2RightKey' : Phaser.Keyboard.RIGHT,
    'player2DownKey' : Phaser.Keyboard.DOWN,
    'player2RotateLKey' : Phaser.Keyboard.N,
    'player2RotateRKey' : Phaser.Keyboard.M,
    
    'player1KeyIndexArray' : {0 : 22, 1 : 24, 2 : 23, 3 : 34, 4 : 35},
    
    'player2KeyIndexArray' : {0 : 41, 1 : 42, 2 : 43, 3 : 37, 4 : 38}
},

PuyoPuyo.game.state.add('PreloadState', PuyoPuyo.PreloadState);
PuyoPuyo.game.state.add('InGameState', PuyoPuyo.InGameState);
PuyoPuyo.game.state.add('MainMenuState', PuyoPuyo.MainMenuState);
PuyoPuyo.game.state.add('TutorialState', PuyoPuyo.TutorialState);
PuyoPuyo.game.state.add('SettingsState', PuyoPuyo.SettingsState);
PuyoPuyo.game.state.start('PreloadState');

var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.Puyo = function(game, x, y, name, PuyoSprites) {
  //ERROR: Pretty sure this phaser call alone should create the sprite,
  //however it does not, have to make the extra add call
  Phaser.Sprite.call(this, game, x, y, 'puyo');
  console.log("creating puyo");
  //some default values
  this.anchor.setTo(0.5);
  this.sprite = this.game.add.sprite(10, 10, 'puyo');
  this.sprite.animations.add('meow');
  this.sprite.animations.play('meow', 1, true);
};

PuyoPuyo.Puyo.prototype = Object.create(Phaser.Sprite.prototype);
PuyoPuyo.Puyo.prototype.constructor = PuyoPuyo.Puyo;
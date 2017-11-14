/* global Phaser */
var PuyoPuyo = PuyoPuyo || {};

PuyoPuyo.game = new Phaser.Game("100", "100", Phaser.AUTO);

PuyoPuyo.game.state.add('InGameState', PuyoPuyo.InGameState);
PuyoPuyo.game.state.add('PreloadState', PuyoPuyo.PreloadState);
PuyoPuyo.game.state.add('MainMenuState', PuyoPuyo.MainMenuState);
PuyoPuyo.game.state.start('PreloadState');

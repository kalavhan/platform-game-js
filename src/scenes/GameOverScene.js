import 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('Over');
  }
 
  preload () {
  }
 
  create () {
    this.model = this.sys.game.globals.model;
    this.scoreBoard = this.sys.game.globals.sB;
    let score = this.model.score;
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontSize: '52px', fill: '#f00' });
    this.finalScoreTitle = this.add.text(0,0, `Time survived:`, { fontSize: '34px', fill: '#fff'});
    this.finalScore = this.add.text(0, 0, `${score}`, {fontSize: '30px', fill: '#fff'});
    this.zone = this.add.zone(width/2, height/2, width, height);
    if (score.split(':')[1] > 0) {
      this.scoreBoard.newScore();
    }
    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone
    );
    Phaser.Display.Align.In.Center(
      this.finalScoreTitle,
      this.zone
    )

    Phaser.Display.Align.In.Center(
      this.finalScore,
      this.zone
    )
    this.gameOverText.setY(100);
    this.finalScoreTitle.setY(180);
    this.finalScore.setY(205);
  }
};
import 'phaser';
import 'regenerator-runtime';
import Button from '../objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('Over');
  }

  preload() {
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.scoreBoard = this.sys.game.globals.sB;
    const score = this.model.score;
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.gameOverText = this.add.text(0, 0, 'Game Over', { fontSize: '52px', fill: '#f00' });
    this.finalScoreTitle = this.add.text(0, 0, `Time survived:`, { fontSize: '34px', fill: '#fff'});
    this.finalScore = this.add.text(0, 0, `${score}`, {fontSize: '30px', fill: '#fff'});
    this.zone = this.add.zone(width / 2, height / 2, width, height);
    this.homeButton = new Button(this, 150, 500, 'blueButton1', 'blueButton2', 'Home', 'Title');
    this.restartButton = new Button(this, 650, 500, 'blueButton1', 'blueButton2', 'Restart', 'Game');
    if (score.split(':')[1] > 0 && localStorage.getItem('scoreSaved') === 'false') {
      const response = this.scoreBoard.newScore();
      response.then(() => {
        this.getScoreBoardData();
      });
    } else {
      this.notEnough = this.add.text(0, 0, 'Survive at least a second to add a record', { fontSize: '28px', fill: '#fff' });
      Phaser.Display.Align.In.Center(
        this.notEnough,
        this.zone,
      );
      this.notEnough.setY(175);
      this.getScoreBoardData();
    }
    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone,
    );
    Phaser.Display.Align.In.Center(
      this.finalScoreTitle,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.finalScore,
      this.zone,
    );
    this.gameOverText.setY(30);
    this.finalScoreTitle.setY(110);
    this.finalScore.setY(145);
  }

  getScoreBoardData() {
    let sb = this.scoreBoard.getScores();
    sb.then(data => {
      const tempTable = this.createList(data.result);
      this.form = this.add.dom(400, 400, tempTable);
    });
  }

  createList(data) {
    const listTable = document.createElement('table');
    listTable.style.color = '#000 ';
    listTable.style.maxHeight = '300px';
    listTable.style.overflowX = 'scroll';
    listTable.style.borderCollapse = 'collapse';
    listTable.style.background = '#fff';
    const firstTr = document.createElement('tr')
    const nameTitle = document.createElement('th');
    nameTitle.style.paddingRight = '40px';
    const scoreTitle = document.createElement('th');
    nameTitle.innerHTML = 'Name';
    scoreTitle.innerHTML = 'Score';
    firstTr.appendChild(nameTitle);
    firstTr.appendChild(scoreTitle);
    listTable.appendChild(firstTr);
    for (let i = 0; i < data.length; i += 1) {
      const tempTr = document.createElement('tr');
      if (i % 2 === 0) {
        tempTr.style.background = '#dddddd';
      }
      const firstTd = document.createElement('td');
      firstTd.style.paddingRight = '40px';
      firstTd.style.textAlign = 'center';
      const secondTd = document.createElement('td');
      firstTd.innerHTML = data[i].user;
      secondTd.innerHTML = data[i].score;
      tempTr.appendChild(firstTd);
      tempTr.appendChild(secondTd);
      listTable.appendChild(tempTr);
    }
    return listTable;
  }
}
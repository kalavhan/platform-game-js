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
    this.finalScoreTitle = this.add.text(0, 0, 'Time survived:', { fontSize: '34px', fill: '#fff' });
    this.finalScore = this.add.text(0, 0, `${score}`, { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(width / 2, height / 2, width, height);
    this.homeButton = new Button(this, 150, 500, 'blueButton1', 'blueButton2', 'Home', 'Title');
    this.restartButton = new Button(this, 650, 500, 'blueButton1', 'blueButton2', 'Restart', 'Game');
    if (score.split(':')[1] > 0 && localStorage.getItem('scoreSaved') === 'false') {
      const response = this.scoreBoard.newScore();
      response.then(() => {
        this.getScoreBoardData();
      });
    } else {
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
    const sb = this.scoreBoard.getScores();
    sb.then(data => {
      const scores = data.result;
      scores.sort((a, b) => {
        let comparison = 0;
        if (a.score > b.score) {
          comparison = -1;
        } else if (a.score < b.score) {
          comparison = 1;
        }
        return comparison;
      });
      const tempTable = this.createList(scores);
      this.form = this.add.dom(400, 400, tempTable);
    });
  }

  createList(data) {
    const listTable = document.createElement('table');
    listTable.id = 'leaderboad';
    listTable.style.color = '#000 ';
    listTable.style.maxHeight = '300px';
    listTable.style.width = '240px';
    listTable.style.overflowX = 'scroll';
    listTable.style.borderCollapse = 'collapse';
    listTable.style.background = '#fff';
    const firstTr = document.createElement('tr');
    const nameTitle = document.createElement('th');
    nameTitle.style.paddingRight = '10px';
    nameTitle.style.width = '50%';
    const scoreTitle = document.createElement('th');
    scoreTitle.style.width = '50%';
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
      firstTd.style.paddingRight = '10px';
      firstTd.style.textAlign = 'center';
      firstTd.style.width = '50%';
      const secondTd = document.createElement('td');
      secondTd.style.width = '50%';
      secondTd.style.textAlign = 'center';
      firstTd.innerHTML = data[i].user;
      secondTd.innerHTML = data[i].score;
      tempTr.appendChild(firstTd);
      tempTr.appendChild(secondTd);
      listTable.appendChild(tempTr);
    }
    this.model.leaderboard = listTable;
    return listTable;
  }
}
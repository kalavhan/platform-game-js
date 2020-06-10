import 'phaser';
import nameForm from '../assets/html/nameForm.html';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  preload() {
  }

  create() {
    const model = this.sys.game.globals.model;
    this.title = this.add.text(0, 0, 'Please enter your name', { fontSize: '32px', fill: '#fff' });
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.zone = this.add.zone(width / 2, height / 2, width, height);
    this.form = this.add.dom(400, 300).createFromHTML(nameForm, 'div');
    this.form.addListener('click');
    this.form.on('click', function (event) {
      if (event.target.name === 'setNameButton') {
        const userName = this.getChildByName('Name');
        if (userName.value !== '') {
          model.userName = userName.value;
          this.scene.scene.start('Title');
          this.scene.form.destroy();
        }
      }
    });
    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );
    this.title.setY(80);
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('playGameMusic', { volume: 0.5, loop: true });
      this.model.bgMusicPlaying = true;
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
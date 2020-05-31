import 'phaser';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
 
  preload () {
  }
 
  create () {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Josue Brigido', { fontSize: '26px', fill: '#fff' });
    this.SceneByText = this.add.text(0, 0, 'Background sprites By: Tio Aimar@opengameart.org', {fontSize: '26px', fill: '#fff'});
    this.playerBy = this.add.text(0, 0, 'Player sprite By: Balmer@opengameart.org', {fontSize: '26px', fill: '#fff'});
    this.musicBy = this.add.text(0, 0, 'Music and Sound effects By: Bogart@opengameart.org', {fontSize: '26px', fill: '#fff'});
    this.zone = this.add.zone(width/2, height/2, width, height);
    
    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );
    
    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.SceneByText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.playerBy,
      this.zone
    )
    
    Phaser.Display.Align.In.Center(
      this.musicBy,
      this.zone
    )

    this.madeByText.setY(900);
    this.SceneByText.setY(1000);
    this.playerBy.setY(1100);
    this.musicBy.setY(1200)

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -50,
      ease: 'Power1',
      duration: 2500,
      delay: 300,
      onComplete: function () {
        this.destroy;
      }
    });
    
    this.madeByTween = this.tweens.add({
      targets: [this.madeByText, this.SceneByText, this.playerBy, this.musicBy],
      y: '-=800',
      ease: 'Power2',
      duration: 7000,
      delay: 200,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};
export default class Model {
  constructor() {
    this.sound = true;
    this.music = true;
    this.bgMusicPl = false;
    this.sc = '00:00';
    this.userNa = 'no name';
    this.leader = false;
    localStorage.setItem('userName', 'no name');
  }

  set musicOn(value) {
    this.music = value;
  }

  get musicOn() {
    return this.music;
  }

  set soundOn(value) {
    this.sound = value;
  }

  get soundOn() {
    return this.sound;
  }

  set bgMusicPlaying(value) {
    this.bgMusicPl = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicPl;
  }

  set score(value) {
    this.sc = value;
    localStorage.setItem('score', value);
  }

  get score() {
    return this.sc;
  }

  set userName(value) {
    this.userNa = value;
    localStorage.setItem('userName', value);
  }

  get userName() {
    return this.userNa;
  }

  set leaderboard(value) {
    this.leader = value;
  }

  get leaderboard() {
    return this.leader;
  }
}
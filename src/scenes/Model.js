export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._score = '00:00';
    this._userName = 'no name';
    localStorage.setItem("userName", 'no name');
  }
 
  set musicOn(value) {
    this._musicOn = value;
  }
 
  get musicOn() {
    return this._musicOn;
  }
 
  set soundOn(value) {
    this._soundOn = value;
  }
 
  get soundOn() {
    return this._soundOn;
  }
 
  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }
 
  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }

  set score(value) {
    this._score = value;
    localStorage.setItem("score", value);
  }

  get score() {
    return this._score;
  }
  
  set userName(value) {
    this._userName = value;
    localStorage.setItem("userName", value);
  }

  get userName() {
    return this._userName;
  }
};
import Model from '../src/scenes/Model';

describe('Test for the implementation of the Model functions', () => {
  const md = new Model();

  it('Returns true as the music is on by default', () => {
    expect(md.musicOn).toEqual(true);
  });

  it('Updates the value of music to false', () => {
    md.musicOn = false;
    expect(md.musicOn).toEqual(false);
  });

  it('Returns true as the sound is on by default', () => {
    expect(md.soundOn).toEqual(true);
  });

  it('Updates the value of sound to false', () => {
    md.soundOn = false;
    expect(md.soundOn).toEqual(false);
  });

  it('Returns false as there is no background music by default', () => {
    expect(md.bgMusicPlaying).toEqual(false);
  });

  it('Updates the value of bgMusicPlaying to true', () => {
    md.bgMusicPlaying = true;
    expect(md.bgMusicPlaying).toEqual(true);
  });

  it('Returns 00:00, as there is no record by default', () => {
    expect(md.score).toEqual('00:00');
  });

  it('Updates the value of score to 00:23', () => {
    md.score = '00:23';
    expect(md.score).toEqual('00:23');
  });

  it('Returns no name as there is no name set by default', () => {
    expect(md.userName).toEqual('no name');
  });

  it('Updates the user name of the user to Goku', () => {
    md.userName = 'Goku';
    expect(md.userName).toEqual('Goku');
  });
});
import 'regenerator-runtime';

export default class Model {
  constructor() {
    this.data = true;
  }

  async newScore() {
    if(localStorage.getItem('scoreSaved') === 'false'){
      console.log('saving')
      localStorage.setItem('scoreSaved', true);
      const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/fgcvn8tPdeIv7gxPID3P/scores/';
      const data = {
        user: localStorage.getItem("userName"),
        score: localStorage.getItem("score"),
      };
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json()
    }
  }

  async getScores() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/fgcvn8tPdeIv7gxPID3P/scores/';
    const response = await fetch(url, {
      mode: 'cors',
    });
    return response.json();
  }
};
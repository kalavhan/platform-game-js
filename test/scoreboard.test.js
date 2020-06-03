import ScoreBoard from '../src/modules/ScoreBoard';

jest.mock('../src/modules/ScoreBoard');
describe('Test for the implementation of the Leaderboard API', () => {
  const sb = new ScoreBoard();
  it('Returns all the scores saved with the API', async () => {
    sb.getScores.mockResolvedValue({ result: [{ user: 'Goku', score: '00:25' }] });
    const recievedScore = await sb.getScores();
    expect(recievedScore).toEqual({ result: [{ user: 'Goku', score: '00:25' }] });
  });
});
import database from './database'

export default class GameApi {

  static async testButtonPress() {
    const ref = database.ref('games')
    const test = ref.push({test: 'test'})
    const obj = await test.once('value')
    console.log(test)
    console.log(obj.val())
  }

  static async findGameByID(gameRefID) {
    console.log("gameRefID before db query: ", gameRefID)
    const queryRef = database.ref('games').child(gameRefID)
    const queryObj = await queryRef.once('value')
    console.log("queryRef: ", queryRef)
    console.log("queryObj.val(): ", queryObj.val())

    return queryObj
  }

  static async createGame(roomName) {

    const gamesRef = database.ref('games')
    const gameRef = gamesRef.push({
      roomName: roomName,
      playerList: [],
      redTeamList: [],
      blueTeamList: [],
      currentDeck: 'standard',
      currentBoard: [
        {word: 'bite', color: 'blue', isFlipped: 0},
        {word: 'dust', color: 'red', isFlipped: 0},
        {word: 'switch', color: 'none', isFlipped: 0},
        {word: 'eagle', color: 'red', isFlipped: 0},
        {word: 'stethoscope', color: 'none', isFlipped: 0},
        {word: 'hole', color: 'none', isFlipped: 0},
        {word: 'witch', color: 'blue', isFlipped: 0},
        {word: 'maracas', color: 'none', isFlipped: 0},
        {word: 'draft', color: 'blue', isFlipped: 0},
        {word: 'root', color: 'black', isFlipped: 0},
        {word: 'bacon', color: 'blue', isFlipped: 0},
        {word: 'tea', color: 'blue', isFlipped: 0},
        {word: 'nut', color: 'blue', isFlipped: 0},
        {word: 'scratch', color: 'none', isFlipped: 0},
        {word: 'ghost', color: 'blue', isFlipped: 0},
        {word: 'saddle', color: 'red', isFlipped: 0},
        {word: 'popcorn', color: 'blue', isFlipped: 0},
        {word: 'opera', color: 'red', isFlipped: 0},
        {word: 'loch ness', color: 'red', isFlipped: 0},
        {word: 'worm', color: 'none', isFlipped: 0},
        {word: 'bee', color: 'red', isFlipped: 0},
        {word: 'axe', color: 'red', isFlipped: 0},
        {word: 'cleopatra', color: 'blue', isFlipped: 0},
        {word: 'limousine', color: 'none', isFlipped: 0},
        {word: 'war', color: 'red', isFlipped: 0},
      ],
    });
    const gameObj = await gameRef.once('value')
    console.log("gameRef: " + gameRef.key)
    console.log("gameObj.val():  ", gameObj.val())

    return gameRef.key
  }
}

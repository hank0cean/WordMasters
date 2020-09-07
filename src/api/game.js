import database from './database'
import { shuffleList, randomNumber } from '../util/util'

export default class GameApi {

  /**
   * Create a game with the given room name.
   * 
   * @param {String} roomName - Name of the room being created.
   */
  static async createGame(roomName) {
    const gamesRef = database.ref('games')
    const redTurn = Math.random() >= 0.5;
    const gameObj = {
      roomName: roomName,
      playerList: [],
      redTeamList: [],
      blueTeamList: [],
      redScore: (redTurn ? 9 : 8),
      blueScore: (redTurn ? 8 : 9),
      redTurn: redTurn,
      currentDeck: 'standard',
    };
    const gameRef = gamesRef.push(gameObj);
    this.createCardListFromDeck(gameRef.key, gameObj.currentDeck, gameObj.redTurn);

    return gameRef.key;
  }

  /**
   * Retrieve the value associated with the given game reference id.
   * 
   * @param {String} gameRefID    - Firebase database reference id for the Game.
   */
  static async findGameByID(gameRefID) {
    const queryRef = database.ref('games').child(gameRefID);
    const queryObj = await queryRef.once('value');

    return queryObj;
  }

  /**
   * Add a function to a Firebase database listener that
   *    runs when a game's child changes on the db. 
   * 
   * @param {String}    gameRefID   - Firebase database reference id for the Game.
   * @param {Function}  func        - Function for the listener.
   */
  static async addListenerToGame(gameRefID, func) {
    return database.ref('games').child(gameRefID).on('child_changed', (snapshot) => {func(snapshot)})
  }

  /**
   * Create a list of cards using given deck name for the game associated with the game reference id.
   * 
   * @param {String}  gameRefID   - Firebase database reference id for the Game.
   * @param {String} deckName     - Name of deck to retrieve words for the game from.
   * @param {Boolean} redFirst    - Random first turn generated.
   */
  static async createCardListFromDeck(gameRefID, deckName, redFirst) {
    let redCount = (redFirst ? 9 : 8);
    let blueCount = (redFirst ? 8 : 9);
    let noneCount = 7;
    const wordList = await this.newWordListFromDeck(deckName);
    const cardList = [];

    for (let index = 0; index < 25; index++) {
      if (redCount-- > 0) cardList.push({gameRefID: gameRefID, word: wordList[index], color: 'red'});
      else if (blueCount-- > 0) cardList.push({gameRefID: gameRefID, word: wordList[index], color: 'blue'});
      else if (noneCount-- > 0) cardList.push({gameRefID: gameRefID, word: wordList[index], color: 'none'});
      else cardList.push({gameRefID: gameRefID, word: wordList[index], color: 'black'});
    }
    shuffleList(cardList);
    cardList.forEach((card) => {this.addNewCardToGame(card.gameRefID, card.word, card.color)})
  }

  /**
   * Create a new Card with the associated Game reference id.
   * 
   * @param {String} gameRefID  - Firebase database reference id for the Game. 
   * @param {String} word       - Word for the card.
   * @param {String} color      - The color of the card: red/blue/none/black.
   */
  static addNewCardToGame(gameRefID, word, color) {
    const cardsRef = database.ref('cards')
    const newCardRef = cardsRef.push({
      gameRefID: gameRefID,
      word: word,
      color: color,
      isFlipped: false,
    })
    return newCardRef;
  }

  /**
   * Add a function to a Firebase database listener that
   *    runs when a card's child changes on the db. 
   * 
   * @param {String}    cardRefID   - Firebase database reference id for the Card.
   * @param {Function}  func        - Function for the listener.
   */
  static async addListenerToCard(cardRefID, func) {
    return database.ref('cards').child(cardRefID).on('child_changed', (snapshot) => {func(snapshot)})
  }

  /**
   * Retrieves value associatied with the given Firebase database reference id.
   * 
   * @param {String} cardRefID  - Firebase database reference id for the Card.
   */
  static async getCardRefByID(cardRefID) {
    return await database.ref('cards').child(cardRefID).once('value');
  }

  /**
   * Change 'isFlipped' value to True on card with given reference id.
   * 
   * @param {String} cardRefID  - Firebase database reference id for the Card.
   */
  static flipCard(cardRefID) {
    var updates = {};

    updates['/cards/' + cardRefID + '/isFlipped'] = true;

    database.ref().update(updates);
  }

  /**
   * Retrieves values from cards database that have a matching game reference id.
   * 
   * @param {String} gameRefID    - Firebase database reference id for the Card.
   */
  static async getCardsByGameID(gameRefID) {
    return database.ref('cards').orderByChild('gameRefID').equalTo(gameRefID).once("value");
  }

  /**
   * Returns new list of 25 random words from the given deck on the database.
   * 
   * @param {String} deckName   - Name of the deck to retrieve words from.
   */
  static async newWordListFromDeck(deckName) {
    const deckRef = database.ref('decks').child(deckName);
    let deckWordsRef = await deckRef.once('value');
    let deckWordList = new Array();
    let wordList = new Array(25);
    let deckSize = 0;
    let cardCount = 0;
    let deckIndex = 0;

    deckWordsRef.forEach((wordRef) => {
      deckWordList.push(wordRef.val().word)
      deckSize++
    });

    while (cardCount < 25) {
      deckIndex = randomNumber(deckIndex + 1, deckSize - 25 + cardCount);
      wordList[cardCount++] = deckWordList[deckIndex];
    }
    shuffleList(wordList);

    return wordList;
  }


  ////////////////////////////////////////////////////////////////////
 
  static async pathHasDuplicate(path, value) {
    let hasDuplicate;

    console.log('path: ', path);

    database.ref(path).equalTo(value).once('value')
    .then((snapshot) => {
      if (snapshot.val() === value) {
        console.log("has duplicate")
        console.log("snapshot.val(): ", snapshot.val());
        console.log('value: ', value);
        hasDuplicate = true;
      }
      else {
        console.log("no duplicate")
        console.log("snapshot.val(): ", snapshot.val());
        console.log('value: ', value);
        hasDuplicate = false;
      }
    })

    return hasDuplicate;
  }

  static async addWordToDeck(deckName, newWord) {
    const decksRef = database.ref('decks')
    const deckRef = decksRef.child(deckName)

    let lastCardIndex = 0;
    let isDuplicate = await this.pathHasDuplicate('decks/' + deckName + '/' + newWord.toLowerCase(), newWord.toLowerCase());

    deckRef.limitToLast(1).on('child_added', (snapshot) => {
      lastCardIndex = snapshot.val().index
    })
    
    deckRef.orderByChild('word').equalTo(newWord.toLowerCase()).on('value', (snapshot) => {
      if (snapshot.val().word === newWord.toLowerCase()) {
        console.log("word is duplicate")
        isDuplicate = true
      }
    })
    if (isDuplicate === false) {
      console.log("word is not a duplicate")
      deckRef.push({index: lastCardIndex + 1, word: newWord.toLowerCase()});
    }
  }
}

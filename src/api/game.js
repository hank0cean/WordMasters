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
      redTeam: [],
      blueTeam: [],
      redScore: (redTurn ? 9 : 8),
      blueScore: (redTurn ? 8 : 9),
      redTurn: redTurn,
      currentDeck: 'standard',
      spymaster1: false,
      spymaster2: false,
    };
    const gameRef = gamesRef.push(gameObj);
    this.createCardListFromDeck(gameRef.key, gameObj.currentDeck, gameObj.redTurn);

    return gameRef.key;
  }

  /**
   * Retrieve the value associated with the given game reference id.
   * 
   * @param   {String}  gameRefID   - Firebase database reference id for the Game.
   * 
   * @returns {Object}              - Firebase database object .val() return.
   */
  static async findGameByID(gameRefID) {
    const queryRef = database.ref('games').child(gameRefID);
    const queryObj = await queryRef.once('value');

    return queryObj.val();
  }

  /**
   * 
   */
  static joinTeam(gameRefID, teamName, username) {
    var updates = {}

    GameApi.findGameByID(gameRefID)
    .then((gameObj) => {
      let currentTeam = (teamName === 'red' ? gameObj.redTeam : gameObj.blueTeam)
      console.log("currentTeam: ", currentTeam);
      (currentTeam ? currentTeam.push({key: '10', name: username}) : currentTeam = [{key: '10', name: username}]);
      console.log("newTeam: ", currentTeam);
      updates['/games/' + gameRefID + '/' + teamName + 'Team'] = currentTeam;
      database.ref().update(updates);
    })
  }

  /**
   * Add a function to a Firebase database listener that
   *    runs when the eventType happens on the db.
   * 
   * @param   {String}    ref         - Name of firebase reference's root.
   * @param   {String}    refID       - Firebase database reference id.
   * @param   {String}    eventType   - Firebase reference .on(eventType).
   * @param   {Function}  func        - Callback function to run when the listener is triggered.
   */
  static async addListenerForRefChild(ref, refID, eventType='value', func) {
    database.ref(ref).child(refID).on(eventType, (snapshot) => {func(snapshot.val())})
  }

  static async removeListenerForRefChild(ref, refID, eventType='value', func=null) {
    if (func) {
      database.ref(ref).child(refID).off(eventType, func)
    }
    else {
      database.ref(ref).child(refID).off(eventType)
    }
  }

  /**
   * Create a list of cards using given deck name for the game associated with the game reference id.
   * 
   * @param {String}    gameRefID   - Firebase database reference id for the Game.
   * @param {String}    deckName    - Name of deck to retrieve words for the game from.
   * @param {Boolean}   redFirst    - Random first turn generated.
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
   * Retrieves value associatied with the given Firebase database reference id.
   * 
   * @param   {String} cardRefID  - Firebase database reference id for the Card.
   * 
   * @returns {Object}            - Firebase database object .val() 
   */
  static async getCardRefByID(cardRefID) {
    return await database.ref('cards').child(cardRefID).once('value');
  }

  /**
   * Change a 'spymaster' value to True
   * 
   * @param {String} cardRefID  - Firebase database reference id for the Card.
   */
  static addSpymaster(gameRefID, second=false) {

    var updates = {};

    if (second) {
      updates['/games/' + gameRefID + '/spymaster2'] = true;
    }
    else {
      updates['/games/' + gameRefID + '/spymaster1'] = true;
    }
    database.ref().update(updates);
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
   * @param   {String} gameRefID  - Firebase database reference id for the Card.
   * 
   * @returns {Object}            - Firebase database object .val() 
   */
  static async getCardsByGameID(gameRefID) {
    const cards = await database.ref('cards').orderByChild('gameRefID').equalTo(gameRefID).once("value");

    return cards.val();
  }

  /**
   * Returns new list of 25 random words from the given deck on the database.
   * 
   * @param {String} deckName   - Name of the deck to retrieve words from.
   */
  static async newWordListFromDeck(deckName) {
    const deckRef = database.ref('decks').child(deckName);
    let deckSnapshot = await deckRef.once('value');
    let deckWordList = new Array();
    let wordList = new Array(25);
    let deckSize = 0;
    let cardCount = 0;
    let deckIndex = 0;

    deckSnapshot.forEach((wordRef) => {
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

  /**
   * Returns True/False if searching the given path & child yields a matching value
   * 
   * @param {String} ref Firebase database reference to search in
   * @param {String} child Database reference child to search by
   * @param {*} value Matching value to search for
   * 
   * @returns {Promise} True/False value
   */
  static async pathHasDuplicate(ref, child, value) {
    // console.log(`pathHasDuplicate('${ref}', '${child}', ${value})`)
    return new Promise(async (resolve, reject) => {
      database.ref(ref).orderByChild(child).equalTo(value).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const result = snapshot.val();
          if (result[child] === value) {
            // console.log(`has duplicate:\n\tchild: ${result[child]}\n\tmatches value: ${value}`)
            resolve(true);
          }
          else {
            resolve(false);
          }
        }
        else {
          // console.log("no snapshot: ");
          // console.log(`has no duplicate:\n\tno child matches value: ${value}`)
          resolve(false);
        }
      });
    })
  }

  /**
   * Adds newWord to the given deckName if the word does not already exist in that deck
   * 
   * @param {String} deckName Name of deck a word will be added to
   * @param {String} newWord New word to be added to the deck
   */
  static async addWordToDeck(deckName, newWord) {

    // console.log(`addNewWordToDeck(${deckName}, ${newWord})`);

    let isDuplicate = await this.pathHasDuplicate('decks/standard', 'word', newWord.toLowerCase())
    
    if (isDuplicate === false) {
      const deckRef = database.ref('decks').child(deckName)
      const lastWordRef = await deckRef.limitToLast(1).once('child_added');
      const lastWordObj = lastWordRef.val();
      const lastWordIndex = lastWordObj.index;
      deckRef.push({index: lastWordIndex + 1, word: newWord.toLowerCase()});
    }
    else {
      // console.log("isDuplicate: ", isDuplicate)
      // console.log("true")
    }
  }
}

  ////////////////////////////////////////////////////////////////////


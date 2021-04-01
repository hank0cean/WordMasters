

export default class CardsApi {


  /**
   * Create a new Card with the associated Game reference id.
   * 
   * @param {String} gameRefID  - Firebase database reference id for the Game. 
   * @param {String} word       - Word for the card.
   * @param {String} color      - The color of the card: red/blue/none/black.
   * 
   * @returns {}
   */
  static createNewCard(gameRefID, word, color) {
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
   * Change 'isFlipped' value to True on card with given reference id.
   * 
   * @param {String} cardRefID    - Firebase database reference id for the Card.
   */
   static flipCard(cardRefID) {
    Firebase.updateRefChild('cards', cardRefID, 'isFlipped', true);
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
    let refList = [];
    refList.map(cardList.forEach((card) => {return this.createNewCard(card.gameRefID, card.word, card.color)}))
    return refList;
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

}

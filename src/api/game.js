import database from './database'
import { shuffleList, randomNumber } from '../util/util'
import Firebase from './firebase'

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
      redTeam: [],
      blueTeam: [],
      redScore: (redTurn ? 9 : 8),
      blueScore: (redTurn ? 8 : 9),
      redTurn: redTurn,
      currentDeck: 'standard',
      spymasterRed: null,
      spymasterBlue: null,
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

    GameApi.findGameByID(gameRefID)
    .then((gameObj) => {
      let currentTeam = (teamName === 'red' ? gameObj.redTeam : gameObj.blueTeam)
      console.log("currentTeam: ", currentTeam);
      if (!currentTeam) {
        // no team, needs to be created
        console.log("create new team w/ new player: ", username);
        currentTeam = [{key: '1', username: username, logged: true, spymaster: false}];
      }

      else {
        // check team for match of username
        let searchForMatch = () => {
          let match = null;
          currentTeam.map(player => {
            console.log("username: ", username)
            console.log("player.username: ", player.username)

            console.log("player: ", player)
            if (player.username === username) {
              console.log("match! player.username: ", player.username)
              match = player;
            }
          });
          return match;
        };
        let match = searchForMatch();
        console.log("match: ", match)

        if (match) {
          if (match.logged) {
            // error: player is already logged in
            console.log("player is already logged in: ", username);
          }
          else {
            // player logging back in, update player object in team
            console.log("logging back in: ", username);
          }
        }
        else {
          // create new player on the team 
          console.log("add new player: ", username);
          currentTeam
          .push({
            key: '42',
            username: username,
            logged: true,
            spymaster: false
          });
        }
      }
      console.log("newTeam: ", currentTeam);
      let childName = teamName.toLowerCase() + 'Team';
      Firebase.updateRefChild('games', gameRefID, childName, currentTeam);
    });
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
   * @param {String} cardRefID    - Firebase database reference id for the Card.
   */
  static addSpymaster(gameRefID, teamName, username) {
    let capitalizedTeamName = teamName === 'red' ? 'Red' : 'Blue';
    Firebase.updateRefChild('games', gameRefID, 'spymaster' + capitalizedTeamName, username);
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
   * @param {String} deckName     - Name of the deck to retrieve words from.
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
   * Adds newWord to the given deckName if the word does not already exist in that deck
   * 
   * @param {String} deckName Name of deck a word will be added to
   * @param {String} newWord New word to be added to the deck
   */
  static async addWordToDeck(deckName, newWord) {

    // console.log(`addNewWordToDeck(${deckName}, ${newWord})`);

    let isDuplicate = await Firebase.pathHasDuplicate('decks/standard', 'word', newWord.toLowerCase())
    
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

  ////////////////////////////////////////////////////////////////////


  static async changePlayerStatus(gameRefID, username) {
    console.log("changing player status")

    if (username !== null) {
      let updateTeam = (team) => {
        let updatedTeam = team.map((player) => {
          if (player.username === username) {
            return {
              key: player.key,
              username: player.username,
              logged: (!player.logged),
              spymaster: player.spymaster,
            }
          } else return player;
        });
        return updatedTeam;
      }
  
      try {
        GameApi.findGameByID(gameRefID)
        .then(({redTeam, blueTeam}) => {
          let playerOnRed = true;
          if (blueTeam) {
            for (let i = 0; i < blueTeam.length; i++) {
              if (blueTeam[i].username === username) {
                playerOnRed = false;
              }
            } 
          }
          else if (!redTeam) throw "no teams";
          let newTeam = playerOnRed ? updateTeam(redTeam) : updateTeam(blueTeam);
          Firebase.updateRefChild('games', gameRefID, playerOnRed ? 'redTeam' : 'blueTeam', newTeam)
        });
      } catch (error) {
        console.log("no teams", error)
      }
    }
  }

  static async login(gameRefID, username) {
    
    // need to update a property inside an object in an array of objects
    let updateTeam = (team) => {
      let updatedTeam = team.map((player) => {
        if (player.username === username) {
          return {
            key: player.key,
            username: player.username,
            logged: true,
            spymaster: player.spymaster,
          }
        } else return player;
      });
      return updatedTeam;
    }

    try {
      GameApi.findGameByID(gameRefID)
      .then(({redTeam, blueTeam}) => {
        let playerOnRed = true;
        if (blueTeam) {
          for (let i = 0; i < blueTeam.length; i++) {
            if (blueTeam[i].username === username) {
              playerOnRed = false;
            }
          } 
        }
        else throw "no teams";
        let newTeam = playerOnRed ? updateTeam(redTeam) : updateTeam(blueTeam);
        Firebase.updateRefChild('games', gameRefID, teamName.toLowerCase() + 'Team', newTeam)
      });
    } catch (error) {
      console.log("no teams", error)
    }
    
  }

  static async logout(gameRefID, teamName, username) {
    console.log("logging out?");
    console.log("logging out?");


    // need to update a property inside an object in an array of objects
    let updateTeam = (team) => {
      let updatedTeam = team.map((player) => {
        if (player.username === username) {
          return {
            key: player.key,
            username: player.username,
            logged: false,
            spymaster: player.spymaster,
          }
        } else return player;
      });
      return updatedTeam;
    }

    GameApi.findGameByID(gameRefID)
    .then(({redTeam, blueTeam}) => {
      let newTeam = teamName === 'red' ? updateTeam(redTeam) : updateTeam(blueTeam);
      Firebase.updateRefChild('games', gameRefID, teamName.toLowerCase() + 'Team', newTeam)
    });
  }

}

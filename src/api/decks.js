
import Firebase from './firebase'
import Database from './database'

const deckLoginKey = '42';

export default class DeckApi {
  /**
   * Retrieve the value associated with the given game reference id.
   * 
   * @param   {String}  key   - Firebase database reference id for the Game.
   * 
   * @returns {Object}        - Firebase database object .val() return.
   */

  static verifyLoginKey(key) {
    if (key === deckLoginKey) return true;
    else return false;
  }

  /**
   * 
   */
  static thisfunct() {
    
  }
}

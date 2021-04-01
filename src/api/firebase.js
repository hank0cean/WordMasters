
import database from './database'

export default class Firebase {
  /**
   * Add a listener function to a Firebase database reference that
   *    runs when the eventType happens.
   * 
   * @param   {String}    ref         - Name of firebase reference's root.
   * @param   {String}    refID       - Firebase database reference id.
   * @param   {String}    eventType   - Firebase reference .on(eventType).
   * @param   {Function}  func        - Callback function to run when the listener is triggered.
   */
  static async addListenerForRefChild(ref, refID, eventType='value', func) {
    database.ref(ref).child(refID).on(eventType, (snapshot) => {func(snapshot.val())})
  }

  /**
   * Remove a listener function to a Firebase database reference.
   * 
   * @param   {String}    ref         - Name of firebase reference's root.
   * @param   {String}    refID       - Firebase database reference id.
   * @param   {String}    eventType   - Firebase reference .on(eventType).
   * @param   {Function}  func        - Callback function to run when the listener is triggered.
   */
  static async removeListenerForRefChild(ref, refID, eventType='value', func=null) {
    if (func) {
      database.ref(ref).child(refID).off(eventType, func)
    }
    else {
      database.ref(ref).child(refID).off(eventType)
    }
  }

  /**
   * Update given Firebase database reference child w/ new update.
   * 
   * @param   {String}    refName     - Name of firebase reference's root.
   * @param   {String}    refID       - Firebase database reference id.
   * @param   {String}    childName   - Name of child in the given reference.
   * @param   {*}         update      - The update to be given to the reference's child.
   */
  static updateRefChild(refName, refID, childName, update) {
    let updates = {}

    updates['/' + refName + '/' + refID + '/' + childName] = update;
    database.ref().update(updates);
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

}
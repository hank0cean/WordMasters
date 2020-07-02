import database from './database'

export default class GameApi {

  static async createGame(){
    const ref = database.ref('games')
    const test = ref.push({test: 'test'})
    const obj = await test.once('value')
    console.log(test)
    console.log(obj.val())
  }
}
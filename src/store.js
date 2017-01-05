const {List} = require('immutable-ext')
const {curryN} = require('ramda')

const ShowMeStore = require('./types/showMeStore')

const store = curryN(5, (...x) =>
  List(x)
    .map(ShowMeStore)
    .fold(ShowMeStore.empty()))

module.exports = store

if (process.argv[1] === __filename) {
  const res = store({})({type: 'ADD_IS_DIRTY',payload: false})({})({})

  console.log(res)
}

const Task = require('data.task')
const {Repository} = require('nodegit')
const {cond, equals, T} = require('ramda')

const isRepo = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(() => res(true))
      .catch(() => res(false)))
    .map(cond([
      [equals(true), () => ({
        type: 'ADD_IS_REPO'
      })],
      [T, () => ({})]
    ]))

module.exports = isRepo

if (process.argv[1] === __filename) {
  isRepo().fork(console.error, console.log)
}

const Task = require('data.task')
const {Repository} = require('nodegit')
const {cond, equals, T} = require('ramda')

const isDirty = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getStatus()
        .then(status => res(status.length > 0)))
      .catch(() => res()))
    .map(cond([
      [equals(true), () => ({
        type: 'ADD_IS_DIRTY'
      })],
      [T, () => ({})]
    ]))

module.exports = isDirty

if (process.argv[1] === __filename) {
  isDirty().fork(console.error, console.log)
}

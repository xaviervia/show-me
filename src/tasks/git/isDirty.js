const Task = require('data.task')
const {Repository} = require('nodegit')
const {cond, complement, isNil, equals, T} = require('ramda')

const isDirty = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getStatus()
        .then(status => res(status.length)))
      .catch(() => res()))
    .map(cond([
      [complement(isNil), n => ({
        type: 'ADD_IS_DIRTY',
        payload: n
      })],
      [T, () => ({})]
    ]))

module.exports = isDirty

if (process.argv[1] === __filename) {
  isDirty().fork(console.error, console.log)
}

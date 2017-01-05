const Task = require('data.task')
const {Repository, Branch} = require('nodegit')
const {cond, is, T} = require('ramda')

const currentBranch = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getCurrentBranch()
        .then(branch => Branch.name(branch).then(name => res(name))))
      .catch(() => res()))
    .map(cond([
      [is(String), name => ({
        type: 'ADD_BRANCH',
        payload: name.trim()
      })],
      [T, () => ({})]
    ]))

module.exports = currentBranch

if (process.argv[1] === __filename) {
  currentBranch().fork(console.error, console.log)
}

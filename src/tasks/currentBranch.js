const Task = require('data.task')
const {Repository, Branch} = require('nodegit')

const currentBranch = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getCurrentBranch()
        .then(branch => Branch.name(branch).then(name => res(name))))
      .catch(() => res())
  )

module.exports = currentBranch

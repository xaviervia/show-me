const Task = require('data.task')
const {Repository} = require('nodegit')

const isDirty = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getStatus()
        .then(status => res(status.length > 0)))
      .catch(() => res())
  )

module.exports = isDirty

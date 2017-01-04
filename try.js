const {Repository, Branch} = require('nodegit')

Repository.open('.')
  .then(repo => repo.getStatus()
    .then(status => console.log(status)))

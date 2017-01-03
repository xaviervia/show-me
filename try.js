const Git = require('nodegit')

Git.Repository.open('.')
  .then(repo => repo.getCurrentBranch().then(branch => console.log('woot')))
  .then(branch => console.log('branch', branch))

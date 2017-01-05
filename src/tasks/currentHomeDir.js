const runCommand = require('./runCommand')

const currentHomeDir = () =>
  runCommand('echo $HOME')
    .map(({stdout}) => stdout)
    .map(s => s.trim())
    .map(s => ({
      type: 'ADD_CURRENT_HOME_DIR',
      payload: s
    }))

module.exports = currentHomeDir

if (process.argv[1] === __filename) {
  currentHomeDir().fork(console.error, console.log)
}

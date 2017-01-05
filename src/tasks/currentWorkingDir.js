const runCommand = require('./runCommand')

const getCurrentWorkingDir = () =>
  runCommand('pwd')
    .map(({stdout}) => stdout)
    .map(s => s.trim())
    .map(s => ({
      type: 'ADD_CURRENT_WORKING_DIR',
      payload: s
    }))

module.exports = getCurrentWorkingDir

if (process.argv[1] === __filename) {
  getCurrentWorkingDir().fork(console.error, console.log)
}

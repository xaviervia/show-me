const runCommand = require('./src/tasks/runCommand')

runCommand('echo $HOME').fork(console.error, console.log)

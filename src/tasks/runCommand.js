const Task = require('data.task')
const {exec} = require('child_process')

const runCommand = (command) =>
  new Task((rej, res) =>
    exec(command, (error, stdout, stderr) =>
      error ? rej(error) : res({ stdout, stderr })))

module.exports = runCommand

const Task = require('data.task')
const {exec} = require('child_process')

const runCommand = (command, args) =>
  new Task((rej, res) =>
    exec(command, args, (error, stdout, stderr) =>
      error ? rej(error) : res({ stdout, stderr })))

module.exports = runCommand

const Task = require('data.task')
const {List} = require('immutable-ext')
const {exec} = require('child_process')

const runCommand = (command, args) =>
  new Task((rej, res) =>
    exec(command, args, (error, stdout, stderr) =>
      error ? rej(error) : res({ stdout, stderr })))

const pwd = runCommand('pwd')
  .map(({stdout}) => stdout)
  .map(s => s.trim())
  .map(s => ({pwd: s}))

const git = runCommand('git status')
  .map(({stdout}) => stdout)
  .map(s => s.trim())
  .map(s => ({git: s}))

const Merge = x => ({
  x,
  concat: ({x: y}) => Merge(Object.assign({}, x, y)),
  fold: (f) => f(x),
  inspect: () => `Merge(${JSON.stringify(x)})`
})

Merge.empty = () => Merge({})

const output = pwd => git =>
  List([pwd, git])
    .map(Merge)
    .fold(Merge.empty())
    .fold(x => x)

Task.of(output)
.ap(pwd)
.ap(git)
.fork(console.error, console.log)

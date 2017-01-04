#!/usr/bin/env node
const Task = require('data.task')
const {List} = require('immutable-ext')
const {exec} = require('child_process')
const {Repository, Branch} = require('nodegit')

const Box = require('./src/box')
const Merge = require('./src/merge')
const PairList = require('./src/pairList')

const runCommand = (command, args) =>
  new Task((rej, res) =>
    exec(command, args, (error, stdout, stderr) =>
      error ? rej(error) : res({ stdout, stderr })))

const currentBranch = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getCurrentBranch()
        .then(branch => Branch.name(branch).then(name => res(name))))
      .catch(() => res('-'))
  )

const isDirty = () =>
  new Task((rej, res) =>
    Repository.open('.')
      .then(repo => repo.getStatus()
        .then(status => res(status.length > 0)))
      .catch(() => res(false))
  )

const pwd = runCommand('pwd')
  .map(({stdout}) => stdout)
  .map(s => s.trim())
  .map(s => ({pwd: s}))

const branch = currentBranch()
  .map(s => s.trim())
  .map(s => ({branch: s}))

const dirty = isDirty()
  .map(b => ({dirty: b}))

const output = pwd => branch => dirty =>
  List([pwd, branch, dirty])
    .map(Merge)
    .fold(Merge.empty())
    .fold(PairList)
    .map(([key, value]) => {
      switch (key) {
        case 'pwd':
          return ['📂', value]

        case 'branch':
          return ['🌿', value]

        case 'dirty':
          return [value ? '⚡️' : '✨', '']
      }
    })
    .fold(([key, value]) => [`${key}  ${value}`])
    .join('\n')

Task.of(output)
.ap(pwd)
.ap(branch)
.ap(dirty)
.fork(console.error, console.log)

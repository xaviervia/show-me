#!/usr/bin/env node
const Task = require('data.task')
const {List} = require('immutable-ext')

const Box = require('./src/types/box')
const Merge = require('./src/types/merge')
const PairList = require('./src/types/pairList')

const currentBranch = require('./src/tasks/currentBranch')
const isDirty = require('./src/tasks/isDirty')
const runCommand = require('./src/tasks/runCommand')

const pwd = runCommand('pwd')
  .map(({stdout}) => stdout)
  .map(s => s.trim())
  .map(s => ({pwd: s}))

const branch = currentBranch()
  .map(r => {
    if (r != null) {
      return {
        branch: r.trim()
      }
    }

    return {}
  })

const dirty = isDirty()
  .map(r => {
    if (r != null) {
      return {
        dirty: r
      }
    }

    return {}
  })

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

#!/usr/bin/env node
const Task = require('data.task')

const store = require('./store')

const selector = require('./selector')

const currentBranch = require('./tasks/git/currentBranch')
const isDirty = require('./tasks/git/isDirty')
const isRepo = require('./tasks/git/isRepo')
const currentHomeDir = require('./tasks/path/currentHomeDir')
const currentWorkingDir = require('./tasks/path/currentWorkingDir')

Task.of(store)
.ap(currentBranch())
.ap(currentHomeDir())
.ap(currentWorkingDir())
.ap(isDirty())
.ap(isRepo())
.map(selector)
.fork(console.error, console.log)

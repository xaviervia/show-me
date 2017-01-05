#!/usr/bin/env node
const Task = require('data.task')

const store = require('./store')

const selector = require('./selector')

const currentBranch = require('./tasks/currentBranch')
const currentHomeDir = require('./tasks/currentHomeDir')
const currentWorkingDir = require('./tasks/currentWorkingDir')
const isDirty = require('./tasks/isDirty')

Task.of(store)
.ap(currentBranch())
.ap(currentHomeDir())
.ap(currentWorkingDir())
.ap(isDirty())
.map(selector)
.fork(console.error, console.log)

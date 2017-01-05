const {gray} = require('chalk')
const ShowMeStore = require('./types/showMeStore')
const PairList = require('./types/pairList')

const selector = store =>
  store
    .fold(PairList)
    .map(([key, value]) => {
      switch (key) {
        case 'path':
          return [
            '📂',
            value.currentWorkingDir.startsWith(value.currentHomeDir)
              ? `${gray(value.currentHomeDir + '/')}${value.currentWorkingDir.slice(value.currentHomeDir.length + 1)}`
              : value.currentWorkingDir
          ]

        case 'git':
          return [ `🌿${value.isDirty ? ' ⚡️' : ''}`, value.currentBranch]
      }
    })
    .fold(([key, value]) => [`${key}  ${value}`])
    .join('\n')

module.exports = selector

if (process.argv[1] === __filename) {
  const res = selector(ShowMeStore({"git":{"isDirty":true, currentBranch: 'master'}}))

  console.log(res)
}

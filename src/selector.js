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
              ? `${gray('~/')}${value.currentWorkingDir.slice(value.currentHomeDir.length + 1)}`
              : value.currentWorkingDir
          ]

        case 'git':
          return value.isRepo
            ? [ '🌿', `${value.currentBranch} ${value.isDirty ? ' ⚡️ ' + gray(value.isDirty) : ''}`]
            : ['', '']
      }
    })
    .fold(([key, value]) => key !== '' ? [`${key}  ${value}`] : [])
    .filter(x => x[0] != null)
    .join('\n')

module.exports = selector

if (process.argv[1] === __filename) {
  const res = selector(ShowMeStore({"git":{"isDirty":true, isRepo: true, currentBranch: 'master'}}))

  console.log(res)
}

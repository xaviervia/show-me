const createStoreType = require('day-dream/createStoreType')
const {objectLens} = require('fantasy-lenses').Lens

const gitLens = objectLens('git')
const currentBranchLens = gitLens.andThen(objectLens('currentBranch'))
const isDirtyLens = gitLens.andThen(objectLens('isDirty'))
const isRepoLens = gitLens.andThen(objectLens('isRepo'))

const pathLens = objectLens('path')
const currentHomeDir = pathLens.andThen(objectLens('currentHomeDir'))
const currentWorkingDirLens = pathLens.andThen(objectLens('currentWorkingDir'))

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_WORKING_DIR':
      return currentWorkingDirLens.run(state).set(action.payload)

    case 'ADD_CURRENT_HOME_DIR':
      return currentHomeDir.run(state).set(action.payload)

    case 'ADD_BRANCH':
      return currentBranchLens.run(state).set(action.payload)

    case 'ADD_IS_DIRTY':
      return isDirtyLens.run(state).set(action.payload)

    case 'ADD_IS_REPO':
      return isRepoLens.run(state).set(true)

    default:
      return state
  }
}

const emptyState = {
  path: {
    currentHomeDir: undefined,
    currentWorkingDir: undefined,
  },
  git: {
    currentBranch: undefined,
    isDirty: undefined,
    isRepo: undefined
  }
}

const ShowMeStore = createStoreType(reducer, emptyState)

module.exports = ShowMeStore

if (process.argv[1] === __filename) {
  const res = ShowMeStore.empty()
    .concat(ShowMeStore({
      type: 'ADD_IS_REPO',
      // payload: '/asdfadsf'
    }))

  console.log(res)
}

const {objectLens} = require('fantasy-lenses').Lens

const gitLens = objectLens('git')
const currentBranchLens = gitLens.andThen(objectLens('currentBranch'))
const isDirtyLens = gitLens.andThen(objectLens('isDirty'))

const pathLens = objectLens('path')
const currentHomeDir = pathLens.andThen(objectLens('currentHomeDir'))
const currentWorkingDirLens = pathLens.andThen(objectLens('currentWorkingDir'))

const ShowMeStore = state => ({
  state,
  concat: ({state: action}) => {
    switch (action.type) {
      case 'ADD_CURRENT_WORKING_DIR':
        return ShowMeStore(
          currentWorkingDirLens.run(state).set(action.payload)
        )

      case 'ADD_CURRENT_HOME_DIR':
        return ShowMeStore(
          currentHomeDir.run(state).set(action.payload)
        )

      case 'ADD_BRANCH':
        return ShowMeStore(
          currentBranchLens.run(state).set(action.payload)
        )

      case 'ADD_IS_DIRTY':
        return ShowMeStore(
          isDirtyLens.run(state).set(true)
        )

      default:
        return ShowMeStore(state)
    }
  },
  fold: f => f(state),
  inspect: () => `ShowMeStore(${JSON.stringify(state)})`,
  map: f => ShowMeStore(f(state))
})

ShowMeStore.empty = () => ShowMeStore({
  path: {
    currentHomeDir: undefined,
    currentWorkingDir: undefined,
  },
  git: {
    currentBranch: undefined,
    isDirty: undefined
  }
})

module.exports = ShowMeStore

if (process.argv[1] === __filename) {
  const res = ShowMeStore.empty()
    .concat(ShowMeStore({
      type: 'ADD_IS_DIRTY',
      payload: false
    }))

  console.log(res)
}

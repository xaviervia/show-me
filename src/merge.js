const Merge = x => ({
  x,
  concat: ({x: y}) => Merge(Object.assign({}, x, y)),
  fold: (f) => f(x),
  inspect: () => `Merge(${JSON.stringify(x)})`
})

Merge.empty = () => Merge({})

module.exports = Merge

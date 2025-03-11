export { default as Text } from './Text/index.vue'

import Grid_ from './Grid/index.vue'
import Cell from './Grid/GridCell.vue'

export const Grid = Object.assign(Grid_, {
  Cell
})
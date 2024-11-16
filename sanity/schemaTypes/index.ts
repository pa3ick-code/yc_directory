import { type SchemaTypeDefinition } from 'sanity'

import {authorType} from './authorType'
import { startupType } from './startupTypes'
import { playlistType } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, startupType, playlistType],
}

import * as migration_20260126_020807 from './20260126_020807';
import * as migration_20260126_192736 from './20260126_192736';
import * as migration_20260126_202743 from './20260126_202743';

export const migrations = [
  {
    up: migration_20260126_020807.up,
    down: migration_20260126_020807.down,
    name: '20260126_020807',
  },
  {
    up: migration_20260126_192736.up,
    down: migration_20260126_192736.down,
    name: '20260126_192736',
  },
  {
    up: migration_20260126_202743.up,
    down: migration_20260126_202743.down,
    name: '20260126_202743'
  },
];

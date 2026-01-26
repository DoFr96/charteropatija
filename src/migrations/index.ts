import * as migration_20260126_020807 from './20260126_020807';

export const migrations = [
  {
    up: migration_20260126_020807.up,
    down: migration_20260126_020807.down,
    name: '20260126_020807'
  },
];

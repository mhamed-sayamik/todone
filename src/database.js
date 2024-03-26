import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  tasks: '++id, status', // Primary key and indexed props
  entries: '++id, [date+taskId], date'
});
  
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let db: Database<sqlite3.Database, sqlite3.Statement>;

open({
  filename: './mondial.db',
  driver: sqlite3.Database
}).then(_db => {
  db = _db;
  console.log('opened database')
})

export default () => db
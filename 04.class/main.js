const MemoApp = require('./memo_app')
const MemoOptions = require('./memo_options')
const MemoDB = require('./memo_db')

MemoApp.crud(new MemoOptions(), new MemoDB())

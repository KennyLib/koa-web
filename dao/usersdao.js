const db = require('../config/sqlite3');
const _ = {
    sqliteSearch: (callback) => {
        database.all("SELECT rowid AS id, info FROM lorem", callback);
    }
    
}

module.exports = _;

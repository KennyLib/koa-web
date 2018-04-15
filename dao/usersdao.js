const db = require('../config/sqlite3');

const search = (callback) => {
    database.all("SELECT rowid AS id, info FROM lorem", callback);
};

module.exports = search;

const sqlite3 = require('sqlite3').verbose();

//可以使用内存型，数据不会永久保存
database = new sqlite3.Database(":memory:", function (err) {
    if (err) throw err;
});
database.serialize(function () {
    database.run("CREATE TABLE lorem (info TEXT)");

    var stmt = database.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
});

// database.close();

module.exports = database;


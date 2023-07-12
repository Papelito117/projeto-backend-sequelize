const db = require("./config/db_sequelize");

db.sequelize.sync({ force: true }).then(() => {
  console.log('{ force: true }');
});

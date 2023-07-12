const Sequelize = require('sequelize');
//const sequelize = new Sequelize('database', 'username', 'password', {
  const sequelize = new Sequelize('festival2', 'postgres', 'halowars', {
    host: 'localhost',
    dialect: 'postgres'
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/models_postgres/usuario.js')(sequelize, Sequelize);
db.Apresentacao = require('../models/models_postgres/apresentacao.js')(sequelize, Sequelize);
db.Votacao = require('../models/models_postgres/votacao.js')(sequelize, Sequelize);


// 5 // Relacionamentos entre as tabelas
// db.Usuario.hasMany(db.Apresentacao, { foreignKey: 'id' });
// db.Apresentacao.belongsTo(db.Usuario, { foreignKey: 'id' });

module.exports = db;




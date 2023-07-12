module.exports = (sequelize, Sequelize) => {
  const Votacao = sequelize.define('votacao', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    aberto: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nota: {
      type: Sequelize.FLOAT,
      allowNull: false,
    }
  });

  return Votacao;
};

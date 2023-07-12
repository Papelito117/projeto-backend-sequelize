module.exports = (sequelize, Sequelize) => {
  const Apresentacao = sequelize.define('apresentacao', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nomeMusica: {
      type: Sequelize.STRING,
      allowNull: false
    },
    participante_um: {
      type: Sequelize.STRING,
      allowNull: false
    },
    participante_dois: {
      type: Sequelize.STRING,
      allowNull: true
    },
    participante_tres: {
      type: Sequelize.STRING,
      allowNull: true
    },
    participante_quatro: {
      type: Sequelize.STRING,
      allowNull: true
    },
    participante_cinco: {
      type: Sequelize.STRING,
      allowNull: true
    },
    totalVotos: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });

  return Apresentacao;
}


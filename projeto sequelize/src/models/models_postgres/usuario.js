
module.exports = (sequelize, Sequelize) => {

    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        tipo: {
            type: Sequelize.STRING, 
            allowNull: false,
            values: ['admin', 'candidato', 'ouvinte']
        },
        login: {
            type: Sequelize.STRING, allowNull: false
        },
        senha: {
            type: Sequelize.STRING, allowNull: false
        },
        codigo:{
            type:Sequelize.STRING, allowNull:true
        },
        pergunta_secreta: {
            type: Sequelize.STRING, allowNull: false
        },
        resposta_pergunta: {
            type: Sequelize.STRING, allowNull: false
        }
      

    });
   

    return Usuario;
}
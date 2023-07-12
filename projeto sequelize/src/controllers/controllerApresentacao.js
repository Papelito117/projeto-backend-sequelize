const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path = require('path');
const apresentacao = require('../models/models_postgres/apresentacao');

module.exports = {

  async getApresentacaoCreate(req, res) {
    try {
      if (res.locals.tipoUsuario === 'ouvinte') {
        return res.send('<script>alert("Acesso negado. Você não possui permissão para criar apresentacoes."); window.location.href = "/home";</script>');
      }
      
      res.render('apresentacao/apresentacaoCreate');
    } catch (error) {
      console.error('Erro ao renderizar a página de criação de apresentação:', error);
      res.redirect('/home');
    }
  },
  

/*
  async getApresentacaoCreate(req, res) {
    res.render('apresentacao/apresentacaoCreate');
  },
  */
  async postApresentacaoCreate(req, res) {
    try {
      const { nomeMusica,
        participante_um,
        participante_dois,
        participante_tres,
        participante_quatro,
        participante_cinco,
      } = req.body;

      await db.Apresentacao.create({
        nomeMusica,
        participante_um,
        participante_dois,
        participante_tres,
        participante_quatro,
        participante_cinco
      });

      // A apresentação foi criada com sucesso
      res.redirect('/apresentacaoList');
    } catch (error) {
      // Ocorreu um erro ao criar a apresentação
      res.redirect('/apresentacaoCreate');
    }
  },



  async getApresentacaoList(req, res) {
    try {
        if (res.locals.tipoUsuario === 'ouvinte') {
          return res.send('<script>alert("Acesso negado. Você não possui permissão para editar."); window.location.href = "/home";</script>');
        }
      
      db.Apresentacao.findAll().then(apresentacao => {
        res.render('apresentacao/apresentacaoList', { apresentacoes: apresentacao.map(apresentacao => apresentacao.toJSON()) });
      });
      //  res.render('apresentacao/apresentacaoList', { apresentacoes: apresentacoes });
    } catch (error) {
      console.error(error);
      // Ocorreu um erro ao buscar as apresentações
      res.render('error', { message: 'Erro ao buscar as apresentações' });
    }
  },
  async getApresentacaoVotos(req, res) {
    try{ 
    db.Apresentacao.findAll().then(apresentacao => {
      res.render('apresentacao/totalVotos', { apresentacoes: apresentacao.map(apresentacao => apresentacao.toJSON()) });
    });
    } catch (error) {
      console.error(error);
      res.render('error', { message: 'Erro ao buscar os votos da apresentação' });
    }
  },

 async getApresentacaoEdit(req, res) {
  try {
    if (res.locals.tipoUsuario === 'ouvinte') {
      return res.send('<script>alert("Acesso negado. Você não possui permissão para editar."); window.location.href = "/home";</script>');
    } else {
      console.log( req.params.id )
     await db.Apresentacao.findOne({ id: req.params.id }).then((apresentacao) => {
        res.render('apresentacao/apresentacaoEdit', { id: req.params.id, apresentacao: apresentacao.toJSON() });
      });
    }
  } catch (error) {
    console.error(error);
    // Ocorreu um erro ao buscar as apresentações
    res.render('error', { message: 'Erro ao buscar as apresentações' });
  }
  },

  async putApresentacao(req, res) {
    const { id } = req.params;
    const { nomeMusica, participante_um, participante_dois, participante_tres,
      participante_quatro, participante_cinco, totalVotos } = req.body;

    try {
      const apresentacao = await db.Apresentacao.findByPk(id);

      if (!apresentacao) {
        // A apresentação não foi encontrada
        return res.redirect('/apresentacao/apresentacaoList');
      }

      // Atualizar os dados da apresentação
      await apresentacao.update({
        nomeMusica,
        participante_um,
        participante_dois,
        participante_tres,
        participante_quatro,
        participante_cinco,
        totalVotos
      });

      // A apresentação foi atualizada com sucesso
      res.redirect('/apresentacao/apresentacaoList');
    } catch (error) {
      // Ocorreu um erro ao atualizar a apresentação
      res.redirect('/apresentacao/apresentacaoList');
    }
  },

  
  async postApresentacaoEdit(req, res) {

     db.Apresentacao.update(req.body, { where: {id: req.params.id } });
     console.log(req.params.id)
    res.render('home');
  },
  

  async deleteApresentacao(req, res) {
    const { id } = req.params;
  
    try {
      const apresentacao = await db.Apresentacao.findByPk(id);
      const apresentacoes = await db.Apresentacao.findAll();
  
      if (!apresentacao) {
        // A apresentação não foi encontrada
        res.render('apresentacao/apresentacaoCreate', { apresentacoes: apresentacoes.map(apresentacao => apresentacao.toJSON()) });
        return;
      }
  
      // Verificar se o usuário é "admin"
      if (res.locals.tipoUsuario !== 'admin') {
        // Acesso negado para usuários que não são "admin"
        return res.send('<script>alert("Acesso negado. Você não possui permissão para excluir."); window.location.href = "/apresentacaoList";</script>');
      }
  
      // Excluir a apresentação
      await apresentacao.destroy();
  
      // A apresentação foi excluída com sucesso
      res.redirect('/apresentacaoList');
    } catch (error) {
      // Ocorreu um erro ao excluir a apresentação
      const apresentacoes = await db.Apresentacao.findAll();
      res.render('apresentacao/apresentacaoList', { apresentacoes: apresentacoes.map(apresentacao => apresentacao.toJSON()) });
    }
  }

 
};





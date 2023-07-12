const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path = require('path');
const votacao = require('../models/models_postgres/votacao');
module.exports = {

  async getInicioVotacao(req, res) {

    try {
      const votacao = await db.Votacao.findOne();
      let votacaoAberta = false;

      if (votacao === null) {
        votacaoAberta = false;
      } else {
        votacaoAberta = true;
      }
      if (res.locals.tipoUsuario != 'admin') {
        return res.send('<script>alert("Acesso negado."); window.location.href = "/home";</script>');
      }
      res.render('votacao/abrirVotacao', {
        votacaoAberta
      });
    } catch (error) {
      res.redirect('/home'); // Redireciona para a página inicial em caso de erro
    }
  },

  async getVotacao(req, res) {
    try {
      const votacao = await db.Votacao.findOne();
      if (!votacao) {
        return res.redirect('/abrirVotacao')
      }

      res.render('votacao/votacaoList')
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a votação' });
    }
  },

  async postVotacao(req, res) {
    const { aberto } = req.body;

    try {
      await db.Votacao.create({
        aberto,
        nota: 0
      })

      // res.json({ success: 'Status da votação atualizado com sucesso' });
      res.redirect('/home');
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o status da votação' });
    }
  },

  async getLista(req, res) {
    try {
      const votacoes = await db.Votacao.findAll();
      const votacoesJSON = votacoes.map(votacao => votacao.toJSON());
      const apresentacoes = await db.Apresentacao.findAll()
      const apresentacoesJSON = apresentacoes.map(apresentacao => apresentacao.toJSON());
      let mostrarApresentacoes = true;

      if (!votacoesJSON[0]) {
        mostrarApresentacoes = false;
      }

      res.render('votacao/votacaoList', {
        apresentacoes: apresentacoesJSON,
        mostrarApresentacoes
      })
      // res.json({ votacoes: votacoesJSON });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as votações' });
    }
  },

  async postLista(req, res) {
    const { nomeMusica, participante_um, participante_dois, participante_tres, participante_quatro, participante_cinco } = req.body;

    try {
      const novaApresentacao = await db.Apresentacao.create({
        nomeMusica,
        participante_um,
        participante_dois,
        participante_tres,
        participante_quatro,
        participante_cinco
      });

      res.json({ success: 'Apresentação criada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar a apresentação' });
    }
  },

  async votar(req, res) {
    try {
      const { id, voto } = req.body;

      const apresentacao = await db.Apresentacao.findOne({
        where: { id }
      });
      apresentacao.totalVotos += Number(voto);
      apresentacao.save();

      res.redirect('/home')
    } catch (error) {
      res.redirect('/home')
      res.status(500).json({ error: 'Erro ao registrar o voto' });
    }
  },

  async encerrarVotacao(req, res) {
    try {
      await db.Votacao.destroy({
        where: {},
        truncate: true
      });

      res.redirect('/home')
    } catch (error) {

    }
  }
}
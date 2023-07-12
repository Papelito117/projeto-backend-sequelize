const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path = require('path');



module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {
        const { login, senha } = req.body;
        try {
          const usuario = await db.Usuario.findOne({
            where: { login, senha }
          });
          if (usuario) {
            req.session.login = login;
            if (usuario.tipo === 'admin') {
              res.redirect('/adm',);
            }else if (usuario.tipo === 'ouvinte' || usuario.tipo === 'candidato'){
             res.redirect('/home');
            } else {
              res.redirect('/');
            }
          } else {
            res.redirect('/');
          }
        } catch (error) {
          console.error('Erro ao realizar o login:', error);
        }
      },
    async getRecuperarSenha(req, res) {

        db.Usuario.findAll({ where: { login: req.params.login } }).then(usuarios => {
            if (usuarios.length > 0) {
                res.render('usuario/recuperaSenha', {
                    layout: 'noMenu.handlebars',
                    id: usuarios[0]._id,
                    login: req.params.login,
                    pergunta: usuarios[0].pergunta_secreta
                });
            }
            else {
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        db.Usuario.findAll({ where: { login: req.body.login, pergunta_secreta: req.body.pergunta } }).then(usuarios => {
            if (usuarios.length > 0) {
                res.render('usuario/senhaRecuperada', {
                    layout: 'noMenu.handlebars',
                    senha: usuarios[0].senha
                });
            }
            else {
                res.status(500).json({ error: 'Erro ao recuperar senha' });
            }
        });
    },

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },
    
    async getAdm(req,res){
        res.render('usuario/adm' , { layout: 'noMenu.handlebars' } )
    },
    async postAdm(req, res) {
        try {
          const { codigo } = req.body;
      
          const usuarioValido = await db.Usuario.findOne({
            where: {
              codigo: '12345'
            }
          });
      
          if (usuarioValido && usuarioValido.codigo === codigo) {
            res.redirect('/home');
          } else {
            res.send('<script>alert("Código inválido. Acesso negado."); window.location.href = "/";</script>');
          }
        } catch (error) {
          console.error('Erro ao renderizar a página /adm:', error);
          res.redirect('/');
        }
      },
      
      
      
      
      
      
    async postCreate(req, res) {
        db.Usuario.create({
            id: req.body._id,
            login: req.body.login,
            senha: req.body.senha,
            codigo: req.body.codigo,
            pergunta_secreta: req.body.pergunta,
            resposta_pergunta: req.body.resposta,
            tipo: req.body.tipo
           
        });
        res.redirect('/home');
    },
    async getList(req, res) {
        try {
            if (res.locals.tipoUsuario != 'admin') {
                return res.send('<script>alert("Acesso negado. Você não possui permissão para ver a lista."); window.location.href = "/home";</script>');
              }
            db.Usuario.findAll().then(usuarios => {
              res.render('usuario/usuarioList', { usuarios: usuarios.map(usuarios => usuarios.toJSON()) });
            });
       
        } catch (error) {
          console.error('Erro ao carregar lista de usuários:', error);
          res.redirect('/');
        }
      },
    
      
      
      
      
      
      
      
      
      /*
    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(usuarios => usuarios.toJSON()) });
        });
    },
    */
    async getEncerrarVotacao(req, res) {
        try {
            const votacao = await db.Votacao.findOne();
            if (votacao) {
                votacao.aberto = 0; // Define o status da votação como fechado
                await votacao.save();
            }
            res.redirect('/home'); // Redireciona para a página inicial
        } catch (error) {
            res.redirect('/home'); // Redireciona para a página inicial em caso de erro
        }
    },

    async getApresentacoesOrdenadas(req, res) {
        try {
            const apresentacoes = await db.Apresentacao.findAll({
                order: [['totalVotos', 'DESC']] // Ordena as apresentações pela nota (totalVotos) em ordem decrescente
            });
            res.render('apresentacoesOrdenadas', { apresentacoes }); // Renderiza a página com as apresentações ordenadas
        } catch (error) {
            res.redirect('/home'); // Redireciona para a página inicial em caso de erro
        }
    }

    // ...


};

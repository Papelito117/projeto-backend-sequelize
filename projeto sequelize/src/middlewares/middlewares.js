const db = require("../config/db_sequelize");

module.exports = {

  logRegister(req, res, next) {
    console.log(req.url + req.method + new Date());
    next();
  },

  sessionControl(req, res, next) {
    if (req.session.login !== undefined) {
      db.Usuario.findOne({
        where: { login: req.session.login }
      })
        .then((usuario) => {
          if (usuario) {
            const tipoUsuario = usuario.tipo;
            console.log(tipoUsuario);
            if (tipoUsuario === 'admin' || tipoUsuario === 'ouvinte' || tipoUsuario === 'candidato') {
              res.locals.tipoUsuario = tipoUsuario;
              res.locals.usuarioLogado = req.session.login;
            }
          }
          next();
        })
        .catch((error) => {
          console.error('Erro ao obter o tipo do usuário:', error);
          next();
        });
    } else if (req.url === '/home' && req.method === 'GET') {
      next();
    }
    else if (req.url === '/' && req.method === 'GET') {
      next();
    } else if (req.url === '/login' && req.method === 'POST') {
      next();
    } else if (req.url.startsWith('/recuperaSenha')) {
      next();
    } else if (req.url === '/usuarioCreate' && req.method === 'GET') {
      next();
    } else if (req.url === '/usuarioCreate' && req.method === 'POST') {
      next();
    } else if (req.url === '/votar' && req.method === 'GET') {
      res.render('votar');
    } else {
      res.redirect('/');
    }
  },

  checkCandidateAccess(req, res, next) {
    // Verifica se o usuário é um candidato
    if (req.session.tipoUsuario === 'candidato') {
      next();
    } else {
      // Redireciona para a página de acesso negado
      res.redirect('/acesso-negado');
    }
  },

  checkVoterAccess(req, res, next) {
    // Verifica se o usuário é um votante/ouvinte
    if (req.session.tipoUsuario === 'ouvinte') {
      next();
    } else {
      // Redireciona para a página de acesso negado
      res.redirect('/acesso-negado');
    }
  },

  checkAdminAccess(req, res, next) {
    // Verifica se o usuário é um administrador
    if (req.session.tipoUsuario === 'admin') {
      next();
    } else {
      // Redireciona para a página de acesso negado
      res.redirect('/acesso-negado');
    }
  },
};







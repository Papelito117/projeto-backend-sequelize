const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const apresentacaoController = require('../controllers/controllerApresentacao');
const votacaoController = require('../controllers/controllerVotacao');
const { checkAdminAccess } = require('../middlewares/middlewares');



const route = express.Router();

module.exports = route;


route.get("/home", function (req, res) {
  res.render('home');
});

route.get("/logout", controllerUsuario.getLogout);

// Controller Usuario
// Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
// Usuario - Login e Recuperação de Senha 
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
// Rota para exibir a página de recuperação de senha
route.get('/recuperaSenha/:login', controllerUsuario.getRecuperarSenha);
// Rota para lidar com o envio do formulário de recuperação de senha
route.post('/recuperaSenha/', controllerUsuario.postRecuperarSenha);


// Rota para exibir o formulário de criação de apresentação
route.get('/apresentacaoCreate', apresentacaoController.getApresentacaoCreate);

// Rota para criar uma nova apresentação
route.post('/apresentacaoCreate', apresentacaoController.postApresentacaoCreate);

//rota para solicitar codigo adm 
route.get('/adm', controllerUsuario.getAdm);
route.post('/adm', controllerUsuario.postAdm);
// Rota para exibir a lista de apresentações
route.get('/apresentacaoList', apresentacaoController.getApresentacaoList);

// Rota para exibir o formulário de edição de apresentação
route.get('/apresentacaoEdit/:id', apresentacaoController.getApresentacaoEdit);

// Rota para exibir lista de apresentação editada
route.post('/apresentacaoEdit/:id', apresentacaoController.postApresentacaoEdit);
// Rota para atualizar uma apresentação existente
route.put('/apresentacaoEdit/:id', apresentacaoController.putApresentacao);

// Rota para excluir uma apresentação existente
route.post('/apresentacaoDelete/:id', apresentacaoController.deleteApresentacao);

route.get('/totalVotos/', apresentacaoController.getApresentacaoVotos);
// Rota para exibir as apresentações de um candidato específico

// ... outras rotas relacionadas às apresentações ...

// Rota para obter a votação
route.get('/abrirVotacao', votacaoController.getInicioVotacao)

// route.get('/votacao', votacaoController.getVotacao);

// Rota para atualizar a votação
route.post('/abrirVotacao', votacaoController.postVotacao);


route.post('/encerrarVotacao', votacaoController.encerrarVotacao);

// Rota para obter a lista de votações
route.get('/votacao', votacaoController.getLista);

// Rota para criar uma nova apresentação
route.post('/lista', votacaoController.postLista);

// Rota para registrar um voto
route.post('/votar', votacaoController.votar);







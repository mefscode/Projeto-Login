import { Router } from "express";
const endpoints = Router();
import * as UsuarioService from '../service/usuarioService.js';
import { validarToken } from '../utils/tokenUtils.js';

endpoints.get('/listar', async (req, resp) => {
    const resposta = await UsuarioService.ListarUsuario();

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/health', validarToken, (req, resp) => {
    resp.send({
        status: 'ok',
        usuario: req.usuario
    });
})

endpoints.post('/criar', async (req, resp) => {
    try {
        const usuario = req.body;
        const { resposta, token } = await UsuarioService.CriarUsuario(usuario);

        resp.send({
            resposta: `O ID é ${resposta} e o token é ${token}`
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const token = await UsuarioService.Login(email, senha);

        if (!token) {
            return resp.status(401).send({
                erro: 'E-mail ou senha inválidos'
            });
        }

        resp.send({ token });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


export default endpoints;

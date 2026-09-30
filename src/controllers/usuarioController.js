import { Router } from "express";
import jwt from 'jsonwebtoken';
import * as DbUsuario from '../repository/usuarioRepository.js';
import { gerarToken } from '../utils/tokenUtils.js';

const endpoints = Router();
const SECRET_KEY = process.env.secret_key;

function validarToken(tipoPermitido) {
    return (req, resp, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                throw new Error('Token não informado');
            }

            req.usuario = jwt.verify(token, SECRET_KEY);

            if (req.usuario.tipo !== tipoPermitido) {
                return resp.status(403).send({
                    erro: 'Token sem permissão para esta rota'
                });
            }

            next();
        }
        catch (err) {
            return resp.status(401).send({
                erro: err.message
            });
        }
    };
}

endpoints.get('/listar', async (req, resp) => {
    const resposta = await DbUsuario.ListarUsuario();

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/health', validarToken('usuario'), (req, resp) => {
    resp.send({
        status: 'ok',
        usuario: req.usuario
    });
})

endpoints.post('/criar', async (req, resp) => {
    try {
        const usuario = req.body;

        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios');
        }

        if (!isNaN(usuario.nome)) {
            throw new Error('Nome não pode ser um número');
        }

        if (!isNaN(usuario.email)) {
            throw new Error('E-mail não pode ser um número');
        }

        const existe = await DbUsuario.EmailExiste(usuario.email);

        if (existe) {
            throw new Error('Esse email já está cadastrado');
        }

        const resposta = await DbUsuario.NovoUsuario(usuario);

        resp.send({
            resposta: `O ID é ${resposta}`
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
        const {email, senha } = req.body;

        if (!email || !senha) {
            throw new Error('E-mail e senha são obrigatórios');
        }

        if (!isNaN(email)) {
            throw new Error('E-mail não pode ser um número');
        }

        const usuario = await DbUsuario.BuscarPorEmail(email);

        if (!usuario || usuario.senha !== senha) {
            return resp.status(401).send({
                erro: 'E-mail ou senha inválidos'
            });
        }

        const token = gerarToken({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: 'usuario'
        });

        resp.send({ token });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

endpoints.get('/listar-alt', async (req, resp) => {
    const resposta = await DbUsuario.ListarUsuarioAlt();

    resp.send({
        resposta: resposta
    });
});

endpoints.get('/health-alt', validarToken('usuario_alt'), (req, resp) => {
    resp.send({
        status: 'ok',
        usuario: req.usuario
    });
});

endpoints.post('/criar-alt', async (req, resp) => {
    try {
        const usuario = req.body;

        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios');
        }

        if (!isNaN(usuario.nome)) {
            throw new Error('Nome não pode ser um número');
        }

        if (!isNaN(usuario.email)) {
            throw new Error('E-mail não pode ser um número');
        }

        const existe = await DbUsuario.EmailAltExiste(usuario.email);

        if (existe) {
            throw new Error('Esse email já está cadastrado');
        }

        const resposta = await DbUsuario.NovoUsuarioAlt(usuario);

        resp.send({
            resposta: `O ID é ${resposta}`
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/login-alt', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            throw new Error('E-mail e senha são obrigatórios');
        }

        if (!isNaN(email)) {
            throw new Error('E-mail não pode ser um número');
        }

        const usuario = await DbUsuario.BuscarAltPorEmail(email);

        if (!usuario || usuario.senha !== senha) {
            return resp.status(401).send({
                erro: 'E-mail ou senha inválidos'
            });
        }

        const token = gerarToken({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: 'usuario_alt'
        });

        resp.send({ token });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


export default endpoints;

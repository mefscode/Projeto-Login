import jwt from 'jsonwebtoken';
import { tokenFoiInformado } from '../validation/tokenValidation.js';

const SECRET_KEY = process.env.secret_key;

export function validarToken(req, resp, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!tokenFoiInformado(token)) {
        return resp.status(401).send({
            erro: 'Token não informado'
        });
    }

    try {
        req.usuario = jwt.verify(token, SECRET_KEY);
        next();
    }
    catch {
        return resp.status(401).send({
            erro: 'Token inválido ou expirado'
        });
    }
}

export function gerarToken(usuario) {
    return jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
}

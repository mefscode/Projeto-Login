import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.secret_key;

export function gerarToken(usuario) {
    return jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
}

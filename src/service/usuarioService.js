import * as DbUsuario from '../repository/usuarioRepository.js';
import { gerarToken } from '../utils/tokenUtils.js';
import { validarCadastro, validarLogin } from '../validation/usuarioValidation.js';

export async function ListarUsuario() {
    const resposta = await DbUsuario.ListarUsuario();

    return resposta;
}

export async function CriarUsuario(usuario) {
    validarCadastro(usuario);

    const existe = await DbUsuario.EmailExiste(usuario.email);

    if (existe) {
        throw new Error('Esse email já está cadastrado');
    }
    else {
        token;
    }

    const resposta = await DbUsuario.NovoUsuario(usuario);

    return { resposta, token };
}

export async function Login(email, senha) {
    validarLogin(email, senha);

    const usuario = await DbUsuario.BuscarPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
        return null;
    }

    const token = gerarToken({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    });

    return token;
}

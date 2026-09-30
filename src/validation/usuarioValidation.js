export function validarCadastro(usuario) {
    if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
        throw new Error('Nome, e-mail e senha são obrigatórios');
    }

    if (!isNaN(usuario.nome)) {
        throw new Error('Nome não pode ser um número');
    }

    if (!isNaN(usuario.email)) {
        throw new Error('E-mail não pode ser um número');
    }
}

export function validarLogin(email, senha) {
    if (!email || !senha) {
        throw new Error('E-mail e senha são obrigatórios');
    }

    if (!isNaN(email)) {
        throw new Error('E-mail não pode ser um número');
    }
}

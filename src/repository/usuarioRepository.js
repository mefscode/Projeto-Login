import con from './connection.js';

export async function NovoUsuario(usuario){
    let command = `
    INSERT INTO usuarios(nome,email,senha)
    VALUES(?,?,?)
    `

    let [resposta] = await con.query(command, [
        usuario.nome,
        usuario.email,
        usuario.senha
    ])

    return resposta.insertId;
}

export async function ListarUsuario(){
    let command = `
    SELECT nome,email,senha 
    FROM usuarios
    `

    let [resposta] = await con.query(command, [])

    return resposta;
}

export async function EmailExiste(email) {
    let command = `
        SELECT id
        FROM usuarios
        WHERE email = ?
    `;

    let [linhas] = await con.query(command, [email]);

    return linhas.length > 0;
}

export async function BuscarPorEmail(email) {
    const command = `
        SELECT id, nome, email, senha
        FROM usuarios
        WHERE email = ?
    `;

    const [linhas] = await con.query(command, [email]);

    return linhas[0];
}

export async function NovoUsuarioAlt(usuario) {
    const command = `
        INSERT INTO usuarios_alt(nome, email, senha)
        VALUES(?, ?, ?)
    `;

    const [resposta] = await con.query(command, [
        usuario.nome,
        usuario.email,
        usuario.senha
    ]);

    return resposta.insertId;
}

export async function ListarUsuarioAlt() {
    const command = `
        SELECT nome, email, senha
        FROM usuarios_alt
    `;

    const [resposta] = await con.query(command, []);

    return resposta;
}

export async function EmailAltExiste(email) {
    const command = `
        SELECT id_alt
        FROM usuarios_alt
        WHERE email = ?
    `;

    const [linhas] = await con.query(command, [email]);

    return linhas.length > 0;
}

export async function BuscarAltPorEmail(email) {
    const command = `
        SELECT id_alt AS id, nome, email, senha
        FROM usuarios_alt
        WHERE email = ?
    `;

    const [linhas] = await con.query(command, [email]);

    return linhas[0];
}

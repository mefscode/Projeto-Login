import usuario from './controllers/usuarioController.js';

export default function AddRotas(api){
    api.use(usuario);
}
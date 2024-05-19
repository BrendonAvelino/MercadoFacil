const bancoSenhas = [];

export const adicionarUsuario = (email, senha) => {
    bancoSenhas.push({ email, senha });
}

export default bancoSenhas;

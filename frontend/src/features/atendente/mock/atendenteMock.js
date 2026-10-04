// Dados FALSOS, só para desenvolver sem backend. Não é regra de negócio real.
const esperar = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Formato de exemplo: confirmar o padrão YYMMDD-PPSQ com o grupo.
const fila = [
  { id: 1, numero: '261003-SP01', tipo: 'SP' },
  { id: 2, numero: '261003-SG01', tipo: 'SG' },
  { id: 3, numero: '261003-SE01', tipo: 'SE' },
];
let atual = null;

export async function login(usuario, senha) {
  await esperar();
  if (usuario !== 'atendente' || senha !== '123456') {
    const erro = new Error('Usuário ou senha inválidos.');
    erro.status = 401;
    throw erro;
  }
  return {
    token: 'token-falso',
    atendente: { nome: 'Atendente Teste' },
    guiche: { numero: 1 },
  };
}

export async function buscarAtual() {
  await esperar(200);
  return atual;
}

export async function chamarProxima() {
  await esperar();
  const proxima = fila.shift();
  atual = proxima ? { ...proxima, estado: 'CHAMADA', chamadas: 1 } : null;
  return atual;
}

export async function iniciar() {
  await esperar();
  atual = { ...atual, estado: 'EM_ATENDIMENTO' };
  return atual;
}

export async function chamarNovamente() {
  await esperar();
  atual = { ...atual, estado: 'CHAMADA_NOVAMENTE', chamadas: atual.chamadas + 1 };
  return atual;
}

export async function finalizar() {
  await esperar();
  atual = null;
  return null;
}

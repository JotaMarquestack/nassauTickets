import { request, tokenStorage } from './apiAtendente';
import * as mock from '../mock/atendenteMock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function login(usuario, senha) {
  const data = USE_MOCK
    ? await mock.login(usuario, senha)
    : await request('/auth/login', { method: 'POST', body: { usuario, senha } });
  tokenStorage.set(data.token);
  return data; // { token, atendente: { nome }, guiche: { numero } }
}

export function buscarAtual() {
  if (USE_MOCK) return mock.buscarAtual();
  return request('/atendimentos/atual');
}

export function chamarProxima() {
  if (USE_MOCK) return mock.chamarProxima();
  return request('/atendimentos/chamar', { method: 'POST' });
}

export function iniciar(id) {
  if (USE_MOCK) return mock.iniciar(id);
  return request(`/atendimentos/${id}/iniciar`, { method: 'POST' });
}

export function finalizar(id) {
  if (USE_MOCK) return mock.finalizar(id);
  return request(`/atendimentos/${id}/finalizar`, { method: 'POST' });
}

export function chamarNovamente(id) {
  if (USE_MOCK) return mock.chamarNovamente(id);
  return request(`/atendimentos/${id}/chamar-novamente`, { method: 'POST' });
}

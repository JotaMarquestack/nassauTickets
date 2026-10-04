import { createContext, useContext, useState } from 'react';
import * as atendenteService from '../services/atendenteService';
import { tokenStorage } from '../services/apiAtendente';

const AuthContext = createContext(null);
const SESSAO_KEY = 'nassau.atendente.sessao';

function lerSessao() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSAO_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(lerSessao);

  async function entrar(usuario, senha) {
    const { atendente, guiche } = await atendenteService.login(usuario, senha);
    const nova = { atendente, guiche };
    sessionStorage.setItem(SESSAO_KEY, JSON.stringify(nova));
    setSessao(nova);
  }

  function sair() {
    tokenStorage.clear();
    sessionStorage.removeItem(SESSAO_KEY);
    setSessao(null);
  }

  return (
    <AuthContext.Provider value={{ sessao, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

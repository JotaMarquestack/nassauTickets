import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import MensagemErro from '../components/MensagemErro';
import { mensagemDeErro } from '../utils/mensagensErro';

export default function LoginPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(evento) {
    evento.preventDefault();
    if (!usuario.trim() || !senha) {
      setErro('Informe usuário e senha.');
      return;
    }
    setEnviando(true);
    setErro(null);
    try {
      await entrar(usuario.trim(), senha);
      navigate('/atendente/guiche', { replace: true });
    } catch (err) {
      setErro(mensagemDeErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="atendente-login">
      <form className="atendente-card" onSubmit={handleSubmit}>
        <h1>Login do atendente</h1>

        <label htmlFor="atendente-usuario">Usuário</label>
        <input
          id="atendente-usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          disabled={enviando}
        />

        <label htmlFor="atendente-senha">Senha</label>
        <input
          id="atendente-senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          disabled={enviando}
        />

        <MensagemErro mensagem={erro} />

        <button type="submit" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
